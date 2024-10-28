import {
  getMyProducts,
  deleteProduct,
} from "@/app/(with-navbar)/(profile)/my-products/action";
import { getData } from "@/utils/getData";
import { postData } from "@/utils/postData";

jest.mock("@/utils/getData", () => ({
  getData: jest.fn(),
}));
jest.mock("@/utils/postData", () => ({
  postData: jest.fn(),
}));
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(() => ({
    user: {
      jwt: "jwt",
    },
  })),
}));

describe("getMyProducts", () => {
  it("should call getData", async () => {
    getData as jest.Mock;
    await getMyProducts();
    expect(getData).toHaveBeenCalledWith(
      "users/me?populate[products][populate]=*&populate=avatar",
      "jwt"
    );
  });
});

describe("deleteProduct", () => {
  it("should call postData with correct arguments", async () => {
    const productId = 123;
    const token = { jwt: "jwt" };
    postData as jest.Mock;
    await deleteProduct(productId, token);

    expect(postData).toHaveBeenCalledWith({
      url: `products/${productId}`,
      method: "DELETE",
      token: token,
      data: null,
    });
  });
});
