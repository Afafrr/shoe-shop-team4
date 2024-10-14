import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyProfileForm from "@/app/(with-navbar)/(profile)/settings/_components/MyProfileForm";
import { useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { inputs } from "@/app/(with-navbar)/(profile)/settings/_schema/profileSchema";
import { act } from "@testing-library/react";
import { updateUserData } from "@/app/(with-navbar)/(profile)/settings/actions";

jest.mock("../../../../../../app/(with-navbar)/(profile)/settings/actions");
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

(useSession as jest.Mock).mockReturnValue({
  data: {
    user: {
      name: "Test User",
      email: "testuser@example.com",
    },
  },
  status: "authenticated",
});

describe("MyProfileForm", () => {
  const formDataMock = {
    firstName: "Joe",
    lastName: "Rogan",
    email: "joe@gmail.com",
    phoneNumber: "+123123123",
  };
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MyProfileForm formData={formDataMock} />
      </QueryClientProvider>
    );
  });

  it("renders the values in inputs", () => {
    inputs.forEach((input) => {
      expect(screen.getByText(input.label)).toBeInTheDocument();
    });
  });

  it("after submit calls mutate fn properly", async () => {
    await act(async () => {
      fireEvent.click(screen.getByText("Save changes"));
    });
    expect(updateUserData as jest.Mock).toHaveBeenCalledTimes(1);
  });

  it("displays an error from mutation", async () => {
    (updateUserData as jest.Mock).mockReturnValueOnce({
      data: null,
      error: "Error from updateUserData",
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Save changes"));
    });
    expect(screen.getByTestId("WarningIcon")).toBeInTheDocument();
    expect(screen.getByText("Error from updateUserData")).toBeInTheDocument();
  });
});
