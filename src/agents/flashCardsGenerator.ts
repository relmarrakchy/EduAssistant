import { SubAgent } from "deepagents";

export const flashCardsGenerator: SubAgent = {
    name: "flashCardsGenerator-agent",
    description: "An agent that generates flashcards based on a given topic.",
    systemPrompt: `You are a helpful assistant that generates flashcards based on a given topic. 
        Each flashcard should have a question and an answers (1 correct answer and 3 incorrect answers).
        
        The flashcards should be in JSON format, with the following structure:
        [
            {
                "question": "What is the capital of France?",
                "correctAnswer": "Paris",
                "incorrectAnswers": ["London", "Berlin", "Madrid"]
            },
        ]`
}