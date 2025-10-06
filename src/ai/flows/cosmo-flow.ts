'use server';
/**
 * @fileOverview A flow for interacting with the CosmoBot AI.
 * This flow takes a user query and the full list of publications to provide context-aware answers.
 */
import { ai } from '@/ai/genkit';
import {
  CosmoBotInputSchema,
  CosmoBotOutputSchema,
  type CosmoBotInput,
  type CosmoBotOutput
} from './cosmo-flow-types';


// The main wrapper function that will be called from the frontend
export async function askCosmoBot(input: CosmoBotInput): Promise<CosmoBotOutput> {
  return cosmoBotFlow(input);
}


const systemPrompt = `You are CosmoBot, a friendly and curious AI assistant with a passion for space. You are an expert in space biology research based on decades of NASA-funded studies.

Your goal is to have a helpful and engaging conversation with the user.

1.  **Answer from Expertise**: If the user asks about space biology, genetics, human health in space, etc., answer using your expert knowledge. When you do, mention it casually, like "According to common research findings..." or "In the field of space physiology...".
2.  **Use General Knowledge**: For any other questions (like "how far is the moon?", "who was the first woman in space?", or just "how are you?"), use your general knowledge to answer. Be conversational and natural.
3.  **Be Relaxed**: Your personality is curious, enthusiastic, and a little bit nerdy about space, but you're not a formal, stuffy academic. Just be a helpful bot.
4.  **Handle Unanswerable Questions**: If a question is too specific and can't be answered from your knowledge base, say so. For example, "I can't find specific details about that in my knowledge base, but generally speaking..."

Let's chat with the user.

User's query:
{{{query}}}`;

// Define the Genkit prompt
const cosmoBotPrompt = ai.definePrompt({
    name: 'cosmoBotPrompt',
    input: { schema: CosmoBotInputSchema },
    output: { schema: CosmoBotOutputSchema.nullable() }, // Allow nullable output from the model
    prompt: systemPrompt,
});


// Define the Genkit flow
const cosmoBotFlow = ai.defineFlow(
  {
    name: 'cosmoBotFlow',
    inputSchema: CosmoBotInputSchema,
    outputSchema: CosmoBotOutputSchema, // The flow itself will always return a valid string
  },
  async (input) => {
    const { output } = await cosmoBotPrompt(input);
    
    // Handle cases where the model returns a null or empty response
    if (!output) {
      return "I'm sorry, I wasn't able to generate a response. This could be due to a safety filter or an issue with the model. Please try rephrasing your query.";
    }

    return output;
  }
);
