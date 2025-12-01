export interface BasketItem {
  id: number;
  productId: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export interface Basket {
  id: number;
  items: BasketItem[];
}
