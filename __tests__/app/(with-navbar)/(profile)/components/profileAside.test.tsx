import { render, screen } from "@testing-library/react";
import ProfileAside from "@/app/(with-navbar)/(profile)/_components/ProfileAside";
import { UserDataProvider } from "@/contexts/UserDataProvider";
import { mockUserData } from "@/__mocks__/mocks";

describe("ProfileAside", () => {
  it("renders user data", () => {
    render(
      <UserDataProvider data={mockUserData}>
        <ProfileAside activeBtnPath="settings" />
      </UserDataProvider>
    );

    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("TestName")).toBeInTheDocument();
    expect(screen.getByAltText("User profile image")).toHaveAttribute(
      "src",
      "testUrl"
    );
  });

  it("show error icon", () => {
    mockUserData.error = "Error";
    mockUserData.data = null;
    render(
      <UserDataProvider data={mockUserData}>
        <ProfileAside activeBtnPath="settings" />
      </UserDataProvider>
    );
    expect(screen.getByTestId("WarningIcon")).toBeInTheDocument();
  });
});
