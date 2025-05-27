const Facility = require('../models/Facility');
const getDistanceMiles = require('./getDistanceMiles');

// Main matching engine function
async function matchFacilities(referral) {
  const {
    insurance,
    levelOfCare,
    latitude: refLat,
    longitude: refLon,
    maxDistance = 100,
    inNetworkOnly = false
  } = referral;

  const facilities = await Facility.find();
  const results = [];

  for (let facility of facilities) {
    let score = 0;
    const reasons = [];

    // In-network filtering
    const acceptsInsurance = facility.insuranceAccepted?.includes(insurance);

    if (inNetworkOnly && !acceptsInsurance) {
      continue; // skip this facility entirely
    }

    // Score insurance
    if (acceptsInsurance) {
      score += 30;
      reasons.push('Accepted Insurance');
    }

    // Score level of care
    if (facility.levelsOfCare?.includes(levelOfCare)) {
      score += 30;
      reasons.push('Matching Level of Care');
    }

    // Proximity score (if all coords exist)
    let distance = null;
    if (
      refLat != null &&
      refLon != null &&
      facility.latitude != null &&
      facility.longitude != null
    ) {
      distance = getDistanceMiles(refLat, refLon, facility.latitude, facility.longitude);

      if (distance > maxDistance) {
        continue; // skip if too far
      }

      const proximityScore = Math.max(0, 40 - distance);
      score += proximityScore;
      reasons.push(`Within ${distance.toFixed(1)} miles`);
    } else {
      reasons.push('Missing geolocation data');
    }

    results.push({
      facility,
      score,
      reasons,
      distance
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

module.exports = matchFacilities;