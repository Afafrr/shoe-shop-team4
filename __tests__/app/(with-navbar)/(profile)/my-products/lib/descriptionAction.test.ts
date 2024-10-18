import { generateDescription } from "@/app/(with-navbar)/(profile)/my-products/_lib/descriptionAction";
import { streamText } from "ai";

jest.mock("ai", () => ({
  streamText: jest.fn(),
}));

jest.mock("@ai-sdk/google", () => ({
  google: jest.fn(),
}));

jest.mock("ai/rsc", () => ({
  createStreamableValue: jest.fn(() => ({
    value: "Ai generated description",
    update: jest.fn(),
    done: jest.fn(),
  })),
}));

describe("generateDescription", () => {
  it("should generate a description with a title", async () => {
    (streamText as jest.Mock).mockResolvedValue({
      textStream: ["This is a description."],
    });

    const { output } = await generateDescription("Cool Shoes");

    expect(streamText).toHaveBeenCalledWith({
      temperature: 2,
      system: expect.stringContaining(
        "You are an assistant that generates descriptions"
      ),
      prompt:
        'Generate a description for a pair of shoes with the title: "Cool Shoes".',
    });
    expect(output).toBe("Ai generated description");
  });

  it("should generate a generic description when no title is provided", async () => {
    (streamText as jest.Mock).mockResolvedValue({
      textStream: ["Generic shoe description."],
    });

    const { output } = await generateDescription();

    expect(streamText).toHaveBeenCalledWith({
      temperature: 2,
      system: expect.stringContaining(
        "You are an assistant that generates descriptions"
      ),
      prompt: "Generate a generic description for a pair of shoes.",
    });
    expect(output).toBe("Ai generated description");
  });
});
