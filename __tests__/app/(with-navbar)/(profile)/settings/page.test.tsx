import Page from "@/app/(with-navbar)/(profile)/settings/page";
import { render, screen } from "@testing-library/react";
import { getData } from "@/utils/getData";
jest.mock("@/app/(with-navbar)/(profile)/settings/_components/PageClient", () =>
  jest.fn(() => <div>Page Client</div>)
);
jest.mock("@/utils/getData");
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(() => ({
    user: {
      jwt: "JWT",
    },
  })),
}));

describe("Page", () => {
  (getData as jest.Mock).mockResolvedValue({ data: "data", error: "" });
  it("renders without crashing", async () => {
    render(await Page());
    expect(screen.getByText("Page Client")).toBeInTheDocument();
  });
});
