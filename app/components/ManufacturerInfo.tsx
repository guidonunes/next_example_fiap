export async function ManufacturerInfo() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Manufacturer Information</h3>
      <p className="text-gray-600">This product is manufactured by Acme Corp, a leading company in quality goods since 1990.</p>
    </div>
  )
}
