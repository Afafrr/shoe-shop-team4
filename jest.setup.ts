import "@testing-library/jest-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Mock fetch calls
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

// Mock the useRouter function globally
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
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

// Provide a default mock implementation for useSearchParams
(usePathname as jest.Mock).mockReturnValue("path");

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));
