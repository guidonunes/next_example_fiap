'use server'

import { revalidatePath } from 'next/cache';

export interface Review {
  id: number;
  author: string;
  review: string;
  createdAt: Date;
}

const reviews: Review[] = [
  {id: 1, author: 'Alice', review: 'Great product! I really enjoyed it!', createdAt: new Date('2024-01-15')},

];

export async function getReviews(): Promise<Review[]> {
  await new Promise(resolve => setTimeout(()=> resolve(true), 2000));
  return reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function submitReview(formData: FormData) {
  const author = formData.get('author') as string;
  const review = formData.get('review') as string;

  if(!author || author.trim().length<2) {
    console.log('Invalid author name');
    throw new Error('Invalid author name');
  }

  if(!review || review.trim().length<5) {
    console.log('Review is too short');
    throw new Error('Review is too short');
  }

  const newReview: Review = {
    id: reviews.length + 1,
    author: author.trim(),
    review: review.trim(),
    createdAt: new Date()
  }

  reviews.push(newReview);
  console.log('Review submitted:', newReview);

  revalidatePath('/');

}
