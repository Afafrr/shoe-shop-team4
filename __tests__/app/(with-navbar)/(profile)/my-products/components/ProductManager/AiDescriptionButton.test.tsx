import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useFormContext } from "react-hook-form-mui";
import errorToast from "@/components/Alerts/errorToast";
import { generateDescription } from "@/app/(with-navbar)/(profile)/my-products/_lib/descriptionAction";
import { readStreamableValue } from "ai/rsc";
import AiDescriptionButton from "@/app/(with-navbar)/(profile)/my-products/_components/ProductManager/AiDescriptionButton";

jest.mock("react-hook-form-mui", () => ({
  useFormContext: jest.fn(),
}));

jest.mock("ai/rsc", () => ({
  readStreamableValue: jest.fn(),
}));

jest.mock("@/components/Alerts/errorToast", () => jest.fn());

jest.mock(
  "@/app/(with-navbar)/(profile)/my-products/_lib/descriptionAction",
  () => ({
    generateDescription: jest.fn(),
  })
);

describe("AiDescriptionButton", () => {
  const mockSetIsGeneratingDesc = jest.fn();
  const mockSetValue = jest.fn();
  const mockGetValues = jest.fn();

  beforeEach(() => {
    // Mock useFormContext
    (useFormContext as jest.Mock).mockReturnValue({
      getValues: mockGetValues,
      setValue: mockSetValue,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("disables the button when isGeneratingDesc is true", () => {
    render(
      <AiDescriptionButton
        isGeneratingDesc={true}
        setIsGeneratingDesc={mockSetIsGeneratingDesc}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("enables the button when isGeneratingDesc is false", () => {
    render(
      <AiDescriptionButton
        isGeneratingDesc={false}
        setIsGeneratingDesc={mockSetIsGeneratingDesc}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });

  test("calls handleClick on click and updates description", async () => {
    const mockOutput = "AI description";
    mockGetValues.mockReturnValue("Sample Name");
    (generateDescription as jest.Mock).mockResolvedValue({
      output: mockOutput,
    });
    (readStreamableValue as jest.Mock).mockResolvedValue([
      "Generated description",
    ]);

    render(
      <AiDescriptionButton
        isGeneratingDesc={false}
        setIsGeneratingDesc={mockSetIsGeneratingDesc}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetIsGeneratingDesc).toHaveBeenCalledWith(true);
      expect(mockSetValue).toHaveBeenCalledWith("description", "");
      expect(generateDescription).toHaveBeenCalledWith("Sample Name");
    });

    await waitFor(() => {
      expect(mockSetIsGeneratingDesc).toHaveBeenCalledWith(false);
    });
  });

  it("should set hovered state to true on mouse enter and change the Logo color to white", () => {
    render(
      <AiDescriptionButton
        isGeneratingDesc={false}
        setIsGeneratingDesc={mockSetIsGeneratingDesc}
      />
    );

    const button = screen.getByRole("button");

    fireEvent.mouseEnter(button);

    const logo = screen.getByTestId("logo-svg");
    expect(logo).toHaveAttribute("fill", "white");
  });

  it("should set hovered state to false on mouse leave and change the Logo color to #FE645E", () => {
    render(
      <AiDescriptionButton
        isGeneratingDesc={false}
        setIsGeneratingDesc={mockSetIsGeneratingDesc}
      />
    );

    const button = screen.getByRole("button");

    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    const logo = screen.getByTestId("logo-svg");
    expect(logo).toHaveAttribute("fill", "#FE645E");
  });

  test("displays error toast when an error occurs", async () => {
    (generateDescription as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    render(
      <AiDescriptionButton
        isGeneratingDesc={false}
        setIsGeneratingDesc={mockSetIsGeneratingDesc}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledWith(
        "Sorry, something went wrong while generating the response."
      );
      expect(mockSetIsGeneratingDesc).toHaveBeenCalledWith(false);
    });
  });
});
