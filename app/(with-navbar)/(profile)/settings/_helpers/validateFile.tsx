const validImages = ["image/jpeg", "image/png", "image/gif"];

export function validateFile(file: File) {
  if (!validImages.includes(file.type)) {
    return "File should be an image type (JPEG, PNG or GIF).";
  } else if (file.size > 204800) {
    return "Image size should not exceed 200 KB.";
  }
  return null;
}
