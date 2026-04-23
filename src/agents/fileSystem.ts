import { SubAgent } from "deepagents";
import { fileSystemTools } from "./tools/fileSystemTools";

export const fileSystemAgent: SubAgent = {
    name: "fileSystem-agent",
    description: "An agent that interacts with the file system to read and write files.",
    systemPrompt: `You are a helpful assistant that interacts with the file system to read and write files.`,
    tools: [fileSystemTools]
}