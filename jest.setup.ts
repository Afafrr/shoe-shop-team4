import "@testing-library/jest-dom";
import { useRouter, useSearchParams } from "next/navigation";

// Mock the useRouter function globally
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Provide a default mock implementation for useRouter
(useRouter as jest.Mock).mockReturnValue({
  push: jest.fn(),
  prefetch: jest.fn(),
  replace: jest.fn(),
  query: {},
  pathname: "/",
});

// Provide a default mock implementation for useSearchParams
(useSearchParams as jest.Mock).mockReturnValue({
  get: jest.fn().mockReturnValue(null), // Return null or other values as needed
});
