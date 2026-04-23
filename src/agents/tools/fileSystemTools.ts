import { tool } from "langchain";
import * as fs from 'fs/promises';
import * as path from 'path';
import z from "zod";


// The implementation of the saveFile function that saves the generated content to the file system.
const saveFile = async (content: string, type: 'course' | 'flash_cards') => {
  const timestamp = Date.now();
  let folderName = '';
  let extension = '';

  if (type === 'course') {
    folderName = 'courses';
    extension = '.md';
  } else if (type === 'flash_cards') {
    folderName = 'flashCards';
    extension = '.json';
  } else {
    throw new Error('Invalid type parameter provided.');
  }

  // __dirname points to src/agents/tools, so we go up one directory to access the generated folder
  const dirPath = path.join(__dirname, '..', 'generated', folderName);
  const filePath = path.join(dirPath, `${type}_${timestamp}${extension}`);

  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, content, 'utf-8');

  return filePath;
}


export const fileSystemTools = tool(
    async({ content, type }: { content: string; type: 'course' | 'flash_cards' }) => {
        return await saveFile(content, type);
    },
    {
        name: "saveFile",
        description: "A tool that saves the generated content to the file system. It takes two parameters: content (the generated course outline or flashcards) and type (indicating whether the content is a course outline or flashcards). The tool saves the content in a specific folder based on its type and returns the file path where the content is saved.",
        schema: z.object({
            content: z.string().describe("The generated course outline or flashcards to be saved."),
            type: z.enum(['course', 'flash_cards']).describe("Indicates whether the content is a course outline or flashcards. It can be either 'course' or 'flash_cards'.")
        })
    }
)
