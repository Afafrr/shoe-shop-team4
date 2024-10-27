import ProfileTitle from "@/app/(with-navbar)/(profile)/_components/ProfileTitle";
import { render, screen } from "@testing-library/react";

describe("ProfileTitle component", () => {
  const title = "My Profile";
  const childrenContent = <div>Child Content</div>;

  it("renders the title correctly", () => {
    const { getByText } = render(
      <ProfileTitle title={title}>{childrenContent}</ProfileTitle>
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(title).tagName).toBe("H4");
  });

  it("renders the children correctly", () => {
    const { getByText } = render(
      <ProfileTitle title={title}>{childrenContent}</ProfileTitle>
    );

    expect(getByText("Child Content")).toBeInTheDocument();
  });
});
