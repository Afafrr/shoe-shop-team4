
export interface Size {
  id: number;
  attributes: {
    value: number;
  };
}

export interface SizesAPIResponse {
  data: Size[];
}

export interface Color {
  id: number;
  attributes: {
    name: string;
  };
}


export interface ProductAttributes {
  name: string;
  price: number;
  description: string;
  images: {
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText: string | null;
        width?: number;
        height?: number;
        formats?: {
          thumbnail?: {
            url: string;
          };
        };
      };
    }[];
  };
  sizes: { data: { id: number; attributes: { value: number } }[] };
  gender: { data: { id: number; attributes: { name: string } } };
  color: { data: { id: number; attributes: { name: string } } };
}

export interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

export interface ProductResponse {
  data: ProductData;
  meta: object;
}
