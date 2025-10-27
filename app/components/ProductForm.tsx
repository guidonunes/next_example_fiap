'use client';

import { useState, useEffect } from 'react';
import { Product } from '../lib/data';


interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
    } else {
      setName('');
      setPrice('');
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      price: parseFloat(price),
    };
    if (product && product.id) {
      onSave({ id: product.id, ...productData });
    } else {
      onSave(productData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{product ? 'Editar Produto' : 'Novo Produto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Título</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Preço</label>
            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" required step="0.01" />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
