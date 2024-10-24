import {
  postData,
  getUserTransactions,
} from "@/app/(with-navbar)/checkout/actions";

describe("postData actions", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns data if successful", async () => {
    (fetch as jest.Mock).mockReturnValue({
      ok: true,
      json: jest.fn().mockResolvedValue("data"),
    });
    expect(await postData("url", {})).toEqual({
      data: "data",
      error: "",
    });
    expect(await getUserTransactions()).toEqual({
      data: "data",
      error: "",
    });
  });

  it("returns error on not ok", async () => {
    (fetch as jest.Mock).mockReturnValue({
      ok: false,
      statusText: "error is here",
    });
    expect(await postData("url", {})).toEqual({
      data: null,
      error: "error is here",
    });
    expect(await getUserTransactions()).toEqual({
      data: null,
      error: "error is here",
    });
  });

  it("returns error on error", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("error is here"));
    expect(await postData("url", {})).toEqual({
      data: null,
      error: "error is here",
    });
    expect(await getUserTransactions()).toEqual({
      data: null,
      error: "error is here",
    });
  });
});
