import AddToCartButton from "./AddToCartButton";


interface ProductCardProps {
  product: {
    id: number,
    title: string,
    price:number;
  }
}


export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-700 mb-4">$ {product.price}</p>
      <div className="mt-4">
      <AddToCartButton key={product.id}/>
      </div>
    </div>
  )

}
