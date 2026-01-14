
"use server";

import { suggestPlugins } from "@/ai/flows/ai-suggest-plugin";
import { z } from "zod";

const FormSchema = z.object({
  pluginName: z.string().min(3, { message: "Plugin name must be at least 3 characters." }),
  pluginDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
});

export type AIFormState = {
  suggestions?: { name: string; description: string }[];
  errors?: {
    pluginName?: string[];
    pluginDescription?: string[];
    _form?: string[];
  };
  message?: string | null;
};

export async function getPluginSuggestions(
  prevState: AIFormState,
  formData: FormData
): Promise<AIFormState> {
  const validatedFields = FormSchema.safeParse({
    pluginName: formData.get("pluginName"),
    pluginDescription: formData.get("pluginDescription"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await suggestPlugins(validatedFields.data);
    if (result.suggestedPlugins && result.suggestedPlugins.length > 0) {
      return {
        message: "Here are some plugin suggestions!",
        suggestions: result.suggestedPlugins,
      };
    } else {
      return { message: "No relevant plugin suggestions found." };
    }
  } catch (e) {
    console.error("AI suggestion error:", e);
    return {
      errors: {
        _form: ["Something went wrong with the AI service. Please try again later."],
      },
    };
  }
}
