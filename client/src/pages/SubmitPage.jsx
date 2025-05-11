export default function SubmitPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Submit a Provider</h2>
      <form className="grid gap-4 max-w-md">
        <input type="text" placeholder="Facility Name" className="p-2 border rounded" />
        <input type="text" placeholder="State" className="p-2 border rounded" />
        <input type="text" placeholder="Insurances (comma separated)" className="p-2 border rounded" />
        <input type="text" placeholder="Levels of Care (comma separated)" className="p-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  )
}
