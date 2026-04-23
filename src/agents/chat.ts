import * as readline from 'readline';
import { agent } from './main';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chatHistory: any[] = [];

console.log("Chat with the DeepAgent! (Type 'exit' or 'quit' to quit)");
console.log("=======================================================");

const askQuestion = () => {
  rl.question('You: ', async (input) => {
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    if (!input.trim()) {
      askQuestion();
      return;
    }

    try {
      chatHistory.push({ role: 'user', content: input });
      
      process.stdout.write('Agent: ');

      // Use streamEvents to capture real-time tokens and tool calls
      const stream = await agent.streamEvents({
        messages: chatHistory,
      }, { version: "v2" });

      let fullResponse = "";

      for await (const event of stream) {
        // Stream text response
        if (event.event === "on_chat_model_stream") {
          const chunk = event.data.chunk;
          if (chunk && chunk.content) {
            process.stdout.write(chunk.content);
            fullResponse += chunk.content;
          }

          // Stream the tool call arguments ("thinking" about tool inputs)
          if (chunk && chunk.tool_call_chunks && chunk.tool_call_chunks.length > 0) {
            for (const tcChunk of chunk.tool_call_chunks) {
              if (tcChunk.args) {
                // Print the tool arguments as they are being generated (streaming thinking)
                process.stdout.write(`\x1b[36m${tcChunk.args}\x1b[0m`);
              }
            }
          }
        }
        
        // Optionally show tool usage indication (thinking)
        else if (event.event === "on_tool_start") {
          process.stdout.write(`\n\x1b[33m[Starting tool/sub-agent: ${event.name}...]\x1b[0m\n`);
        }
        else if (event.event === "on_tool_end") {
          process.stdout.write(`\n\x1b[32m[Finished ${event.name}]\x1b[0m\nAgent: `);
        }
      }

      console.log('\n'); // Ensure a final newline
      
      // Update history with the final assistant message
      if (fullResponse) {
         chatHistory.push({ role: 'assistant', content: fullResponse });
      }

    } catch (error) {
      console.error("\nError communicating with agent:", error);
      // Remove the last user message so they can try again
      chatHistory.pop();
    }

    askQuestion();
  });
};

askQuestion();
