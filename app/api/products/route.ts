import { NextResponse } from "next/server";
import { Product, products } from "@/app/lib/data";




export async function GET() {
  return NextResponse.json(products);
}


export async function POST(request: Request) {
  const newProduct: Product = await request.json();
  if(!newProduct.name || !newProduct.price) {
    return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
  }

  const newId = products.length > 0 ? Math.max(...products.map((p)=>{
    if (p.id) {
      return p.id +1;
    }
    return 0;
  })) : 1;
  newProduct.id = newId;
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
  };
