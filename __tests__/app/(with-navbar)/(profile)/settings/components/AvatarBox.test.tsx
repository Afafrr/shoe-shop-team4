import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockInitialData } from "@/__mocks__/mocks";
import AvatarBox from "@/app/(with-navbar)/(profile)/settings/_components/AvatarBox";

describe("ProfileAside", () => {
  const reducedData = mockInitialData();
  it("shows default avatar icon, if there is no image", () => {
    render(
      <AvatarBox
        formData={reducedData}
        setFormData={jest.fn()}
        image=""
        setImage={jest.fn()}
      />
    );
    expect(screen.getByTestId("PersonIcon")).toBeInTheDocument();
  });

  let changeBtn: HTMLElement;
  let deleteBtn: HTMLElement;
  const setImageMock = jest.fn();

  beforeEach(() => {
    render(
      <AvatarBox
        formData={reducedData}
        setFormData={jest.fn()}
        image="testUrl"
        setImage={setImageMock}
      />
    );
    changeBtn = screen.getByText("Change Photo");
    deleteBtn = screen.getByText("Delete");
  });

  it("displays user image", () => {
    expect(screen.getByAltText("User profile image")).toBeInTheDocument();
  });

  //buttons
  it("checks delete button", async () => {
    fireEvent.click(deleteBtn);
    expect(setImageMock).toHaveBeenCalledWith("");
    screen.debug();
  });

  it("checks change button", () => {
    const fileInput = screen.getByTestId("inputImage");
    const mockClick = jest.fn();

    fileInput.click = mockClick;
    fireEvent.click(changeBtn);
    expect(mockClick).toHaveBeenCalled();
  });

  //file related tests
  it("mocks file selection", () => {
    const fileInput: HTMLInputElement = screen.getByTestId("inputImage");
    const file = new File([""], "example.png", {
      type: "image/png",
    });
    global.URL.createObjectURL = jest.fn();

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files![0]).toEqual(file);
    expect(fileInput.files).toHaveLength(1);
  });

  it("checks wrong file extension error", () => {
    const fileInput: HTMLInputElement = screen.getByTestId("inputImage");
    const file = new File([""], "example.pdf", {
      type: "application/pdf",
    });
    global.URL.createObjectURL = jest.fn();
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(
      screen.getByText("File should be an image type (JPEG, PNG or GIF).")
    ).toBeInTheDocument();
  });

  it("checks file size error", () => {
    const fileInput: HTMLInputElement = screen.getByTestId("inputImage");
    const file = new File([""], "image.png", { type: "image/png" });

    Object.defineProperty(file, "size", { value: 200 * 1024 + 1 });
    global.URL.createObjectURL = jest.fn();
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(
      screen.getByText("Image size should not exceed 200 KB.")
    ).toBeInTheDocument();
  });
});
