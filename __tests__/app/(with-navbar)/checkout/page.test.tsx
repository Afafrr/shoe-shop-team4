import Page from "@/app/(with-navbar)/checkout/page";
import { getCustomerData } from "@/app/(with-navbar)/checkout/serverActions";
import { QueryClient } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { HydrationBoundary } from "@tanstack/react-query";
jest.mock("@/app/(with-navbar)/checkout/_components/ClientPage", () =>
  jest.fn(() => <div>ClientPage</div>)
);

jest.mock("@tanstack/react-query", () => {
  return {
    QueryClient: jest.fn(() => ({
      prefetchQuery: jest.fn(),
    })),
    dehydrate: jest.fn(),
    HydrationBoundary: jest.fn(({ children }) => <div>{children}</div>),
  };
});

describe("Page", () => {
  it("renders ClientPage component", async () => {
    const queryClient = new QueryClient();
    (queryClient.prefetchQuery as jest.Mock).mockResolvedValueOnce({});
    render(await Page());

    await waitFor(() => {
      expect(screen.getByText("ClientPage")).toBeInTheDocument();
    });
  });
});
