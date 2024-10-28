import Page from "@/app/(with-navbar)/(profile)/my-products/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

jest.mock(
  "@/app/(with-navbar)/(profile)/my-products/_components/MyProductsClient",
  () => jest.fn(() => <div>Page Client</div>)
);
jest.mock("@/app/(with-navbar)/(profile)/my-products/action", () => ({
  getMyProducts: jest.fn(),
}));
jest.mock("@/app/(with-navbar)/(profile)/my-products/action", () => ({
  getMyProducts: jest.fn(() => Promise.resolve([])),
}));

describe("Page", () => {
  it("renders without crashing", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        {await Page()}
      </QueryClientProvider>
    );
    expect(screen.getByText("Page Client")).toBeInTheDocument();
  });
});
