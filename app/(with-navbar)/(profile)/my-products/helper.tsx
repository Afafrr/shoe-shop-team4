import { MyProduct, MyImage, EditProduct } from "@/types/Product";

export async function reduceData(data: MyProduct) {
  const newData: Partial<EditProduct> = {};

  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      newData[key as keyof EditProduct] = value;
      continue;
    }
    let newVal = value;
    if (key !== "images") {
      if (Array.isArray(value)) {
        newVal = value.map((item) => {
          return String(item.id);
        });
      }
      if (typeof value === "object" && !Array.isArray(value)) {
        newVal = String(value?.id);
      }
    } else {
      newVal = value.map(async (image: MyImage) => {
        const response = await fetch(image.url);
        const blob = await response.blob();

        const file = new File([blob], image.name, {
          type: image.mime,
        });
        return file;
      });
      console.log(newVal);

      newVal = await Promise.all(newVal);
    }
    if (key === "color" && !Array.isArray(value)) newVal = [newVal];
    newData[key as keyof EditProduct] = newVal;
  }
  return newData;
}
