export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  categoryId: number;
  nuts: boolean;
  vegeterian: boolean;
  spiciness?: number;
}
