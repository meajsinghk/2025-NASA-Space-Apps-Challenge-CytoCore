import { z } from 'genkit';

// Define the input schema for the flow
export const CosmoBotInputSchema = z.object({
  query: z.string().describe("The user's question or prompt."),
});
export type CosmoBotInput = z.infer<typeof CosmoBotInputSchema>;

// Define the output schema for the flow
export const CosmoBotOutputSchema = z.string().describe("The AI's response.");
export type CosmoBotOutput = z.infer<typeof CosmoBotOutputSchema>;
