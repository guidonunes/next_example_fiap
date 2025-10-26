'use client';

import { useState } from "react";

export default function AddToCartButton() {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    alert("Item added to cart!");
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      {isAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  )
};
