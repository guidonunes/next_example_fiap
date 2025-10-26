import { getReviews } from '../actions'


export async function ProductReviews() {
  const reviews = await getReviews();

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Product Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul className='space-y-4'>
          {reviews.map((review) => (
            <li key={review.id} className='border p-4 rounded-lg shadow-sm'>
              <h3 className='text-lg font-semibold'>{review.author}</h3>
              <p className='text-gray-700 mt-2'>{review.review}</p>
              <p className='text-xs text-gray-500 mt-2'>{review.createdAt.toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}


    </div>
  );
}
