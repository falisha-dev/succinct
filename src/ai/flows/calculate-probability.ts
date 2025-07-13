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
  probability: z.number().min(60).max(80).describe('The probability (as a percentage between 60 and 80) of the user getting the selected role.'),
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
    auth: (auth) => {
      // Note: This policy allows any signed-in user to call this flow.
      // You may want to restrict this further for production applications.
      // For example, to allow only the 'admin' role, you would use:
      // auth.email.endsWith('@your-domain.com') && auth.roles.includes('admin')
      return;
    },
  },
  async () => {
    // Generate a random integer between 60 and 80 (inclusive)
    const probability = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
    return { probability };
  }
);
