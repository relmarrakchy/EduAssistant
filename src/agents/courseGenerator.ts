import { SubAgent } from "deepagents";

export const courseGenerator: SubAgent = {
    name: "courseGenerator-agent",
    description: "An agent that generates a course outline based on a given topic.",
    systemPrompt: `You are a helpful assistant that generates a course outline based on a given topic.
        The course outline should be in markdown format.`
    }