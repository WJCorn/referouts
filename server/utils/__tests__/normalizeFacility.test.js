const normalizeFacility = require('../normalizeFacility');

const raw = {
  Facility_Name__c: "Sunrise Recovery",
  State__c: "FL",
  Street__c: "123 Beachside Ave",
  Zip__c: "33401",
  Latitude__c: "26.7153",
  Longitude__c: "-80.0534",
  Insurance_List__c: "Aetna, Cigna",
  Services__c: "Detox, OP",
  Level_of_Care__c: "Residential",
  Phone__c: "561-555-0000",
  Email__c: "info@sunrise.com"
};

const mapping = {
  name: "Facility_Name__c",
  state: "State__c",
  address: "Street__c",
  zip: "Zip__c",
  latitude: "Latitude__c",
  longitude: "Longitude__c",
  insurances: "Insurance_List__c",
  services: "Services__c",
  levelsOfCare: "Level_of_Care__c",
  phone: "Phone__c",
  email: "Email__c"
};

console.log(normalizeFacility(raw, mapping, "org123", "salesforce"));