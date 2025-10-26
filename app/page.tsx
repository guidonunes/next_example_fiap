import { Suspense } from "react";
import ProductList from "./components/ProductList";
import { PromoBanner } from "./components/PromoBanner";
import { ProductReviews } from "./components/ProductReviews";
import { ReviewForm } from "./components/ReviewForm";
import CollapsibleSection from "./components/CollapsibleSection";

export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Showcase</h1>

      <Suspense fallback={<div className="text-center p-4">Carregando produtos...</div>}>
        <ProductList />
      </Suspense>

      <Suspense fallback={<div className="bg-gray-200 p-4 rounded-lg mt-4 text-black"><p>Carregando ofertas...</p></div>}>
        <PromoBanner />
      </Suspense>

      <CollapsibleSection title="User Reviews">
        <Suspense fallback={<p className="mt-8 text-center text-black">Carregando avaliações...</p>}>
          <ProductReviews />
        </Suspense>
        <ReviewForm />
      </CollapsibleSection>
    </div>
  );
}
