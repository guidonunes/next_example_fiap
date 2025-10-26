// app/components/ReviewForm.tsx (Server Component)
import { submitReview } from "../actions";

export function ReviewForm() {
  return (
    <form action={submitReview} className="mt-6 p-4 border rounded-lg bg-white text-black shadow-sm">
      <h3 className="text-lg font-semibold mb-3  text-black">Write a review</h3>
      <div className="mb-3">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input type="text" name="author" id="author" required className="w-full p-2 border rounded-md text-black" />
      </div>
      <div className="mb-3">
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
        <textarea name="review" id="review" rows={3} required className="w-full p-2 border rounded-md text-black"></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Submit Review
      </button>
    </form>
  );
}
