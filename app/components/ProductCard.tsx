import { FaEdit, FaTrash } from "react-icons/fa";
import { Product } from "../lib/data";



interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}


export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  if(!product?.id){
    return null;
  }

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-amber-300 mb-4">$ {product.price}</p>
      <div className="mt-4">
        <button onClick={onEdit} className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition-colors">
          <FaEdit className="inline "/> Edit
        </button>
        <button onClick={onDelete} className="bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors">
          <FaTrash className="inline"/> Delete
        </button>

      </div>
    </div>
  )

}
