import { getCustomerData } from "@/app/(with-navbar)/checkout/serverActions";
import { getData } from "@/utils/getData";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(() => ({
    user: {
      jwt: "jwt",
    },
  })),
}));
jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => {
    return {
      customers: {
        retrieve: jest.fn((customer) => customer),
      },
    };
  });
});
jest.mock("@/utils/getData");

describe("getCustomerData server actions", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {});
    process.env.STRIPE_SECRET_KEY = "secret";
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns data if successful", async () => {
    (getData as jest.Mock).mockResolvedValue({
      data: { customerId: "data" },
      error: "",
    });

    expect(await getCustomerData()).toEqual(
      JSON.stringify({
        data: "data",
        error: "",
      })
    );
  });

  it("returns error if session not found", async () => {
    (getData as jest.Mock).mockResolvedValue({
      data: null,
      error: "err",
    });
    expect(await getCustomerData()).toEqual(
      JSON.stringify({
        data: null,
        error: "Cannot get user data",
      })
    );
  });

  it("returns error if customerId not found", async () => {
    (getData as jest.Mock).mockResolvedValue({
      data: { customerId: "" },
      error: "",
    });
    expect(await getCustomerData()).toEqual(
      JSON.stringify({ data: null, error: "" })
    );
  });
});
