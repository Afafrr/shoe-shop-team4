import React from "react";
import { render, screen } from "@testing-library/react";
import PageClient from "@/app/(with-navbar)/(profile)/settings/_components/PageClient";
import { mockUserData } from "@/__mocks__/mocks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { inputs } from "@/app/(with-navbar)/(profile)/settings/_schema/profileSchema";

describe("PageClient", () => {
  const queryClient = new QueryClient();
  it("Shows error message", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PageClient initialData={{ data: null, error: "An error occurred" }} />
      </QueryClientProvider>
    );
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
    expect(screen.getByTestId("WarningIcon")).toBeInTheDocument();
  });
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <PageClient initialData={mockUserData} />
      </QueryClientProvider>
    );
  });

  it("displays inputs correctly", () => {
    inputs.forEach((input) => {
      const pageInput = screen.getByPlaceholderText(
        input.props.placeholder || ""
      );
      expect(pageInput).toHaveAttribute("name", input.props.name);
      expect(pageInput).toHaveValue(
        mockUserData.data![
          input.props.name as keyof typeof mockUserData.data
        ] as string
      );
    });
  });
});
