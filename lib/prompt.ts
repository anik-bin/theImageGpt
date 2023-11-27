import { surprisePrompts } from "@/app/constants/prompts";

export function getRandomPrompt(prompt: String) {
    const randomPromptIndex = Math.floor(Math.random() * surprisePrompts.length);
    const randomPrompt = surprisePrompts[randomPromptIndex];

    // check if same prompts dont appear in a sequence

    if (randomPrompt === prompt) return getRandomPrompt(prompt)
    return randomPrompt;
}