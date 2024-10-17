import { render, screen } from "@testing-library/react";
import ProfileAside from "@/app/(with-navbar)/(profile)/_components/ProfileAside";
import * as ReactQuery from "@tanstack/react-query";

jest.mock("@tanstack/react-query");
const useQuery = jest.spyOn(ReactQuery, "useQuery");

describe("ProfileAside", () => {
  afterEach(() => {
    useQuery.mockRestore();
  });

  it("renders user data", () => {
    useQuery.mockImplementation(
      jest.fn().mockReturnValue({
        data: {
          error: "",
          data: {
            firstName: "TestName",
            avatar: {
              url: "testUrl",
            },
          },
        },
        isLoading: false,
        isSuccess: true,
      })
    );
    render(<ProfileAside />);
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("TestName")).toBeInTheDocument();
    expect(screen.getByAltText("User profile image")).toHaveAttribute(
      "src",
      "testUrl"
    );
  });

  it("show error icon", () => {
    useQuery.mockImplementation(
      jest.fn().mockReturnValue({
        data: {
          error: "Error",
          data: undefined,
        },
        isLoading: false,
        isSuccess: true,
      })
    );
    render(<ProfileAside />);
    expect(screen.getByTestId("WarningIcon")).toBeInTheDocument();
  });
});
