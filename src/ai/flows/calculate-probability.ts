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
  role: z.enum(['Proofer Promotion', 'Prove Of Love Promotion']).describe('The selected role.'),
});
export type CalculateProbabilityInput = z.infer<typeof CalculateProbabilityInputSchema>;

const CalculateProbabilityOutputSchema = z.object({
  probability: z.number().min(70).max(90).describe('The probability (as a percentage between 70 and 90) of the user getting the selected role.'),
});
export type CalculateProbabilityOutput = z.infer<typeof CalculateProbabilityOutputSchema>;

export async function calculateProbability(input: CalculateProbabilityInput): Promise<CalculateProbabilityOutput> {
  return calculateProbabilityFlow(input);
}

const calculateProbabilityFlow = ai.defineFlow(
  {
    name: 'calculateProbabilityFlow',
    inputSchema: CalculateProbabilityInputSchema,
    outputSchema: CalculateProbabilityOutputSchema,
  },
  async () => {
    // Generate a random integer between 70 and 90 (inclusive)
    const probability = Math.floor(Math.random() * (90 - 70 + 1)) + 70;
    return { probability };
  }
);
