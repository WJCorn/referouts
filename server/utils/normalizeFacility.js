function normalizeFacility(raw = {}, mapping = {}, orgId = '', source = '') {
  const get = (field) => raw[mapping[field]] || '';

  return {
    name: get('name'),
    address: {
      street: get('address'),
      city: get('city'),
      state: get('state'),
      zip: get('zip'),
    },
    phone: get('phone'),
    email: get('email'),
    website: get('website'),
    insuranceAccepted: get('insurances').split(',').map(i => i.trim()).filter(Boolean),
    levelsOfCare: get('levelsOfCare').split(',').map(l => l.trim()).filter(Boolean),
    services: get('services').split(',').map(s => s.trim()).filter(Boolean),
    providerId: null,       // Set in admin UI or matched by logic later
    parentNetwork: null,    // Set in admin UI if facility is part of a network
  };
}