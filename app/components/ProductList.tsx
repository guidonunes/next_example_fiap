import { ProductCard } from "./ProductCard";

export interface Product {
  id: number;
  name: string;
  price: number;
}

async function fetchProducts(): Promise<{ products: Product[] }> {
  await new Promise(resolve => setTimeout(()=> resolve(true), 1000));
  return {
    products: [

      {
        id: 1,
        name: 'Knife',
        price: 100
      },
      {
        id: 2,
        name: 'Air Frier',
        price: 150
      },
      { id: 3,
        name: 'Playstation 5',
        price: 200
      },

    ]

  };
}


export default async function ProductList() {
  const data = await fetchProducts();

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
      {data.products.map((product) => (
        <ProductCard
          key={product.id}
          product={{ id: product.id, title: product.name, price: product.price }}
        />
      ))}
    </div>
  );
}
