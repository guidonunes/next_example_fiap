import { ProductCard } from "./ProductCard";

export interface Product {
  id: number;
  name: string;
  price: number;
}

async function fetchProducts(): Promise<{ products: Product[] }> {
  const response = await fetch(`${process.env.API_BASE_URL}/api/products`, {
    next: {
      revalidate: 30
    }
  })
  return {
    products: await response.json()

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
