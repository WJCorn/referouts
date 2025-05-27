module.exports = function normalizeFacility(row, mapping = {}, orgId = 'defaultOrg', source = 'csv') {
  return {
    name: row[mapping.name] || row['Facility Name'] || '',
    address: {
      street: row[mapping.street] || row['Street'] || '',
      city: row[mapping.city] || row['City'] || '',
      state: row[mapping.state] || row['State'] || '',
      zip: row[mapping.zip] || row['ZIP'] || '',
    },
    phone: row[mapping.phone] || row['Phone'] || '',
    email: row[mapping.email] || row['Email'] || '',
    website: row[mapping.website] || row['Website'] || '',
    insuranceAccepted: row[mapping.insuranceAccepted]
      ? row[mapping.insuranceAccepted].split(',').map(s => s.trim())
      : [],
    levelsOfCare: row[mapping.levelsOfCare]
      ? row[mapping.levelsOfCare].split(',').map(s => s.trim())
      : [],
    services: row[mapping.services]
      ? row[mapping.services].split(',').map(s => s.trim())
      : [],
    providerId: null,
    parentNetwork: null,
    source,
    orgId,
  };
};