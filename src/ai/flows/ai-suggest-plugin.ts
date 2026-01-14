'use server';

/**
 * @fileOverview A plugin suggestion AI agent.
 *
 * - suggestPlugins - A function that suggests relevant plugins based on a given plugin name and description.
 * - SuggestPluginsInput - The input type for the suggestPlugins function.
 * - SuggestPluginsOutput - The return type for the suggestPlugins function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPluginsInputSchema = z.object({
  pluginName: z.string().describe('The name of the plugin.'),
  pluginDescription: z.string().describe('The description of the plugin.'),
});
export type SuggestPluginsInput = z.infer<typeof SuggestPluginsInputSchema>;

const SuggestPluginsOutputSchema = z.object({
  suggestedPlugins: z.array(
    z.object({
      name: z.string().describe('The name of the suggested plugin.'),
      description: z.string().describe('A short description of the suggested plugin.'),
    })
  ).describe('An array of suggested plugins relevant to the input plugin name and description.'),
});
export type SuggestPluginsOutput = z.infer<typeof SuggestPluginsOutputSchema>;

export async function suggestPlugins(input: SuggestPluginsInput): Promise<SuggestPluginsOutput> {
  return suggestPluginsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPluginsPrompt',
  input: {schema: SuggestPluginsInputSchema},
  output: {schema: SuggestPluginsOutputSchema},
  prompt: `You are a Minecraft plugin expert. Given a plugin name and description, suggest other relevant plugins that the user might be interested in.\n\nPlugin Name: {{{pluginName}}}\nPlugin Description: {{{pluginDescription}}}\n\nSuggest plugins:`,
});

const suggestPluginsFlow = ai.defineFlow(
  {
    name: 'suggestPluginsFlow',
    inputSchema: SuggestPluginsInputSchema,
    outputSchema: SuggestPluginsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
