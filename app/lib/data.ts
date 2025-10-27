export interface Product {
  id?: number;
  name: string;
  price: number;
}

export const products: Product[]= [
  {
    id: 1,
    name: "XBox Series X",
    price: 499.99,
  },
  {
    id: 2,
    name: "PlayStation 5",
    price: 499.99,
  },
  {
    id: 3,
    name: "Nintendo Switch",
    price: 299.99,
  },
  {
    id: 4,
    name: "Gaming PC",
    price: 999.99,
  },
  {
    id: 5,
    name: "VR Headset",
    price: 399.99,
  },
  {
    id: 6,
    name: "Gaming Monitor",
    price: 199.99,
  }
]
