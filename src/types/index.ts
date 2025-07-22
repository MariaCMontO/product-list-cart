export type Product = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  id: number;
  name: string;
  category: string;
  price: number;
};

export type ProductItem = Product & {
  amount: number;
};
