import { useState } from 'react';
import Papa from 'papaparse';

export default function ImportCSV() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [columns, setColumns] = useState([]);
  const [mapping, setMapping] = useState({});
  const [result, setResult] = useState(null);

const schemaFields = [
  'name', 'address', 'city', 'state', 'zip',
  'phone', 'email', 'website',
  'insurances', 'services', 'levelsOfCare'
];

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);

    Papa.parse(uploaded, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rows = results.data.slice(0, 5);
        setPreview(rows);
        setColumns(Object.keys(rows[0]));
      }
    });
  };

  const handleMappingChange = (field, value) => {
    setMapping(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('orgId', 'demoOrg');
    formData.append('mapping', JSON.stringify(mapping));

    const res = await fetch(`${import.meta.env.VITE_API_BASE}/import/csv`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CSV Import + Field Mapping</h1>

      <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />

      {columns.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {schemaFields.map(field => (
            <div key={field}>
              <label className="block font-medium">{field}</label>
              <select
                value={mapping[field] || ''}
                onChange={e => handleMappingChange(field, e.target.value)}
                className="border rounded w-full p-2"
              >
                <option value="">-- Select Column --</option>
                {columns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        disabled={!file}
      >
        Submit
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Import Results</h2>
          <p>{result.imported} facilities imported</p>
          <pre className="text-sm bg-gray-100 p-4 rounded mt-2 overflow-auto">
            {JSON.stringify(result.facilities.slice(0, 3), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}