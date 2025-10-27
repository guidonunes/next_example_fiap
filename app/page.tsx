// src/app/page.tsx (versão final e completa)
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import ProductForm from './components/ProductForm';
import { ProductCard } from './components/ProductCard';
import { Product } from './lib/data';
import { ReviewForm } from './components/ReviewForm';
import { useAuth } from './lib/auth';
import Login from './components/Login';



export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Clear error when user logs in
  useEffect(() => {
    if (isAuthenticated && error) {
      setError(null);
    }
  }, [isAuthenticated, error]);

  // Função para buscar os produtos
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/products'); // URL relativa funciona em Client Components
      if (!res.ok) throw new Error('Fail loading products');
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar produtos na montagem do componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Funções de manipulação (Create, Update, Delete)
  const handleSaveProduct = async (productData: Omit<Product, 'id'> | Product) => {
    if (!isAuthenticated) {
      setError('You must be logged in to save products');
      return;
    }

    const isUpdating = 'id' in productData;
    const url = isUpdating ? `/api/products/${productData.id}` : '/api/products';
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized: You must be logged in to save products');
        }
        throw new Error(isUpdating ? 'Failed updating product.' : 'Failed creating new product.');
      }

      // Otimista: Atualiza a UI antes de refazer o fetch
      // ou simplesmente refaz o fetch para garantir consistência
      await fetchProducts();
    } catch (err: any) {
      setError(err.message);
    }
    setIsFormVisible(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!isAuthenticated) {
      setError('You must be logged in to delete products');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized: You must be logged in to delete products');
        }
        throw new Error('Failed deleting product.');
      }
      // Atualiza a UI removendo o produto
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditProduct = (product: Product) => {
    if (!isAuthenticated) {
      setError('You must be logged in to edit products');
      return;
    }
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    if (!isAuthenticated) {
      setError('You must be logged in to add products');
      return;
    }
    setEditingProduct(null);
    setIsFormVisible(true);
  };

  // Renderização condicional
  if (isLoading || authLoading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Erro: {error}</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Next<span className="text-amber-300 ">JS</span> Store</h1>

        <div className="flex gap-2">
          <Login />
          {isAuthenticated && (
            <button
              onClick={handleAddNew}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-colors"
            >
              <FaPlus />
              <span>Add New Product</span>
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => handleEditProduct(product)}
            onDelete={() => {
              if (product.id !== undefined) {
                handleDeleteProduct(product.id);
              }
            }}
            isAuthenticated={isAuthenticated}
          />
        ))}

      </div>

      {isFormVisible && isAuthenticated && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsFormVisible(false);
            setEditingProduct(null);
          }}
        />
      )}
      <ReviewForm />
    <footer className="mt-16 text-center text-gray-500">
        &copy; {new Date().getFullYear()} NextJS Store. All rights reserved.
    </footer>
    </main>
  );
}
