"use server";

import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { createStreamableValue } from "ai/rsc";

export async function generateDescription(title?: string) {
  let prompt = "";

  const systemPrompt = `You are an assistant that generates descriptions for pairs of shoes. 
  Each description should be between 200 and 480 characters long.   
  Only use plain text, we do not support markdown
  Could you make different responses for every request?`;

  if (title && title != "") {
    prompt = `Generate a description for a pair of shoes with the title: "${title}".`;
  } else {
    prompt = `Generate a generic description for a pair of shoes.`;
  }
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: google("gemini-1.5-flash-latest"),
      temperature: 2,
      system: systemPrompt,
      prompt: prompt,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
