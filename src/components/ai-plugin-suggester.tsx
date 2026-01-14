"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getPluginSuggestions, type AIFormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Thinking..." : "Get Suggestions"}
      <Wand2 className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function AIPluginSuggester() {
  const initialState: AIFormState = {};
  const [state, dispatch] = useFormState(getPluginSuggestions, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      formRef.current?.reset();
    }
    if (state.errors?._form) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.errors._form.join(", "),
      });
    }
  }, [state, toast]);


  return (
    <section id="ai-suggester">
      <div className="space-y-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          AI Plugin Suggester
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Have an idea for a plugin? Describe it, and our AI will suggest existing plugins that might fit your needs.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Idea</CardTitle>
            <CardDescription>Provide a name and description for the plugin you have in mind.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={dispatch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pluginName">Plugin Name</Label>
                <Input id="pluginName" name="pluginName" placeholder="e.g., Advanced Teleportation" />
                {state.errors?.pluginName && (
                  <p className="text-sm font-medium text-destructive">{state.errors.pluginName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pluginDescription">Plugin Description</Label>
                <Textarea id="pluginDescription" name="pluginDescription" placeholder="e.g., A plugin that allows players to set homes, warp to locations, and teleport to other players with cool particle effects." className="min-h-[120px]" />
                {state.errors?.pluginDescription && (
                  <p className="text-sm font-medium text-destructive">{state.errors.pluginDescription}</p>
                )}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>Based on your input, here are some plugins you might like.</CardDescription>
          </CardHeader>
          <CardContent>
            {state.suggestions ? (
              <div className="space-y-4">
                {state.suggestions.map((plugin, index) => (
                  <div key={index} className="rounded-md border bg-card p-4">
                    <h4 className="font-headline font-semibold text-primary">{plugin.name}</h4>
                    <p className="text-sm text-muted-foreground">{plugin.description}</p>
                  </div>
                ))}
              </div>
            ) : (
               <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                <p>Your plugin suggestions will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
