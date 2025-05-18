import { useEffect, useState } from "react";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

export default function AdminPage() {
  const { user } = useUser();
  const [providers, setProviders] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/providers`)
      .then((res) => res.json())
      .then((data) => setProviders(data))
      .catch((err) => console.error("❌ Failed to fetch providers:", err));
  }, []);

  const sortedProviders = [...providers].sort((a, b) => {
    const valA = a[sortBy]?.toString().toLowerCase();
    const valB = b[sortBy]?.toString().toLowerCase();
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Provider Admin Table</h1>
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("name")}>Name</th>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("state")}>State</th>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("insurances")}>Insurances</th>
                <th className="p-2 cursor-pointer" onClick={() => handleSort("levelsOfCare")}>Levels of Care</th>
              </tr>
            </thead>
            <tbody>
              {sortedProviders.map((provider, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{provider.name}</td>
                  <td className="p-2">{provider.state}</td>
                  <td className="p-2">{provider.insurances?.join(", ")}</td>
                  <td className="p-2">{provider.levelsOfCare?.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SignedIn>
    </>
  );
}