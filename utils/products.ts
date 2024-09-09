export function extractProductInfo(data: any) {
  if (!data) return [];

  return data.map((product: any) => {
    const { id, attributes } = product;
    const { name, price, images, gender } = attributes;

    const imageUrl =
      images?.data?.length > 0 ? images.data[0].attributes.url : null;

    const genderName = gender?.data?.attributes?.name;

    return {
      id,
      name,
      price,
      gender: genderName,
      imageUrl,
    };
  });
}
