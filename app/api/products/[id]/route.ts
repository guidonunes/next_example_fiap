import { NextResponse } from "next/server";
import { products } from "@/app/lib/data";
import { isAuthenticated } from "@/app/lib/checkAuth";

interface Params {
  id: string;
}

export async function GET(request: Request, context: { params: Promise<Params> }) {
  const params = await context.params
  const id = parseInt(params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);

}


export async function PUT(request: Request, context: { params: Promise<Params> }) {
  // Check authentication
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params
  const id = parseInt(params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const updatedProduct = await request.json();
  products[index] = { ...products[index], ...updatedProduct };

  return NextResponse.json(products[index]);
}

export async function DELETE(request: Request, context: { params: Promise<Params> }) {
  // Check authentication
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

   const params = await context.params
  const id = parseInt(params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  products.splice(index, 1);
  return NextResponse.json({ message: 'Product deleted successfully' });
}
