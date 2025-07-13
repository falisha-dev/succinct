'use server';
/**
 * @fileOverview Calculates the probability of a user getting a specific role based on their Twitter username.
 *
 * - calculateProbability - A function that calculates the probability.
 * - CalculateProbabilityInput - The input type for the calculateProbability function.
 * - CalculateProbabilityOutput - The return type for the calculateProbability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateProbabilityInputSchema = z.object({
  twitterUsername: z.string().describe('The Twitter username of the user.'),
  role: z.enum(['Proofer Promotion Rollup', 'Prove Of Love Promotion Rollup']).describe('The selected role.'),
});
export type CalculateProbabilityInput = z.infer<typeof CalculateProbabilityInputSchema>;

const CalculateProbabilityOutputSchema = z.object({
  probability: z.number().min(70).max(90).describe('The probability (as a percentage between 70 and 90) of the user getting the selected role.'),
});
export type CalculateProbabilityOutput = z.infer<typeof CalculateProbabilityOutputSchema>;

export async function calculateProbability(input: CalculateProbabilityInput): Promise<CalculateProbabilityOutput> {
  return calculateProbabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateProbabilityPrompt',
  input: {schema: CalculateProbabilityInputSchema},
  output: {schema: CalculateProbabilityOutputSchema},
  prompt: `You are a probability calculation AI. You will take in the twitter username of a user, and the role they are applying for, and return a number between 70 and 90 representing the probability of them getting that role. You should add a bit of randomness in your answer.

Twitter Username: {{{twitterUsername}}}
Role: {{{role}}}`,
});

const calculateProbabilityFlow = ai.defineFlow(
  {
    name: 'calculateProbabilityFlow',
    inputSchema: CalculateProbabilityInputSchema,
    outputSchema: CalculateProbabilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
