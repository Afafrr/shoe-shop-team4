import Page from "@/app/(with-navbar)/checkout/page";
import { render, screen } from "@testing-library/react";
import { getCustomerData } from "@/app/(with-navbar)/checkout/serverActions";

jest.mock("@/app/(with-navbar)/checkout/_components/ClientPage", () =>
  jest.fn(() => <div>ClientPage</div>)
);

jest.mock("@/app/(with-navbar)/checkout/serverActions", () => ({
  getCustomerData: jest.fn(),
}));

describe("Page", () => {
  it("renders ClientPage component", async () => {
    (getCustomerData as jest.Mock).mockResolvedValue(
      JSON.stringify({ value: "value" })
    );
    render(await Page());

    expect(screen.getByText("ClientPage")).toBeInTheDocument();
  });
});
