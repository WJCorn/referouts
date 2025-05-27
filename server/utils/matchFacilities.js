const Facility = require('../models/Facility');
const MatchWeight = require('../models/MatchWeight');
const getDistanceMiles = require('./getDistanceMiles');

async function matchFacilities(referral) {
  const {
    insurance,
    levelOfCare,
    latitude: refLat,
    longitude: refLon,
    maxDistance = 100,
    inNetworkOnly = false
  } = referral;

  const ORG_ID = 'demoOrg'; // TODO: Replace with session/org context
  const weights = await MatchWeight.findOne({ orgId: ORG_ID }) || {
    insurance: 30,
    levelOfCare: 30,
    distance: 40
  };

  const facilities = await Facility.find();
  const results = [];

  for (let facility of facilities) {
    let score = 0;
    const reasons = [];

    const acceptsInsurance = facility.insuranceAccepted?.includes(insurance);

    if (inNetworkOnly && !acceptsInsurance) continue;

    // Insurance match
    if (acceptsInsurance) {
      score += weights.insurance;
      reasons.push('Accepted Insurance');
    }

    // Level of care match
    if (facility.levelsOfCare?.includes(levelOfCare)) {
      score += weights.levelOfCare;
      reasons.push('Matching Level of Care');
    }

    // Proximity score
    let distance = null;
    if (
      refLat != null &&
      refLon != null &&
      facility.latitude != null &&
      facility.longitude != null
    ) {
      distance = getDistanceMiles(refLat, refLon, facility.latitude, facility.longitude);

      if (distance > maxDistance) continue;

      const proximityScore = Math.max(0, weights.distance - distance);
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