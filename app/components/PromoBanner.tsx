
export async function PromoBanner() {
  await new Promise(resolve => setTimeout(()=> resolve(true), 5000));
  return (
    <div className='p-4 bg-blue-500 text-white text-center rounded-lg my-4'>
      <h3 className='text-lg font-bold'>Special offer!</h3>
      <p>Get 20% off on your first purchase. Use code FIRST20 at checkout.</p>
    </div>
  );
}
