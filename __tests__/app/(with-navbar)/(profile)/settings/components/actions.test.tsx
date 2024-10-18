import { updateUserData } from "@/app/(with-navbar)/(profile)/settings/actions";
import { mockUserData, mockUserSessionData } from "@/__mocks__/mocks";
import { postData } from "@/utils/postData";
import { mockAvatar } from "@/__mocks__/mocks";
import { postImage, deleteImage } from "@/utils/imageOperations";
import { getData } from "@/utils/getData";

jest.mock("@/utils/postData");
jest.mock("@/utils/imageOperations");
jest.mock("@/utils/getData");

describe("updateUserData", () => {
  const formData = {
    firstName: "Jhon",
    lastName: undefined,
    email: "jhon@gmail.com",
    phoneNumber: "+123123123",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(updateUserData).toBeDefined();
  });

  it("should remove undefined values from formData", async () => {
    await updateUserData(formData, { data: mockUserSessionData });

    expect(postData).toHaveBeenCalledWith({
      data: expect.not.objectContaining({ lastName: undefined }),
      method: "PUT",
      token: "TestJWT",
      url: "users/123",
    });
  });

  const { lastName, ...clearFormData } = formData;
  it("should create image url", async () => {
    (postImage as jest.Mock).mockResolvedValue({
      data: [{ id: 1 }],
      error: "",
    });
    (getData as jest.Mock).mockResolvedValue(mockUserData);

    await updateUserData(
      { ...clearFormData, avatar: mockAvatar },
      { data: mockUserSessionData }
    );

    expect(postImage).toHaveBeenCalledWith({
      url: "upload",
      token: "TestJWT",
      data: mockAvatar,
    });
  });

  it("should return error message if creating image url failed", async () => {
    const errorMsg = "There was an error with image";
    (postImage as jest.Mock).mockResolvedValue({
      data: null,
      error: errorMsg,
    });

    const res = await updateUserData(
      { ...clearFormData, avatar: mockAvatar },
      { data: mockUserSessionData }
    );

    expect(res.error).toBe(errorMsg);
  });

  it("if formData has delete img call postData with avatar undefined", async () => {
    await updateUserData(
      { ...formData, deleteImg: true },
      { data: mockUserSessionData }
    );

    expect(postData).toHaveBeenCalledWith({
      data: expect.objectContaining({ avatar: undefined }),
      method: "PUT",
      token: "TestJWT",
      url: "users/123",
    });
  });

  it("deletes previous image if it appears in user session obj", async () => {
    await updateUserData(
      { ...formData, deleteImg: true },
      { data: mockUserSessionData }
    );
    //using previous getData mock in line 45
    expect(deleteImage).toHaveBeenCalled();
  });
});
