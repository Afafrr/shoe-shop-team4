import { getCustomerData } from "@/app/(with-navbar)/checkout/serverActions";
import { headers } from "next/headers";

jest.mock("next/headers");
describe("getCustomerData server actions", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    (headers as jest.Mock).mockReturnValue({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns data if successful", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue("data"),
    });
    expect(await getCustomerData()).toEqual({
      data: "data",
      error: "",
    });
  });

  it("returns error on not ok", async () => {
    (fetch as jest.Mock).mockReturnValue({
      ok: false,
      statusText: "error is here",
    });
    expect(await getCustomerData()).toEqual({
      data: null,
      error: "error is here",
    });
  });

  it("returns error on error", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("error is here"));
    expect(await getCustomerData()).toEqual({
      data: null,
      error: "error is here",
    });
  });
});
