# Referouts

**Referouts** is a scalable, cloud-hosted referral matching platform designed for treatment centers and healthcare call centers. It helps staff efficiently route inquiries to appropriate external providers based on location, insurance, and level of care. The project is optimized for B2B networking and is extensible for future social-facing applications.

---

## Features

- **Smart Referral Matching**  
  Accepts inputs like insurance, state, and level of care to suggest the most relevant facilities.

- **MongoDB-Backed Directory**  
  All provider data is stored in MongoDB and indexed for performance and future geolocation matching.

- **Customizable Results Weighting**  
  Designed to give businesses full control over what referral options appear for reps.

- **Provider Profile Submission**  
  (Planned) Enables facilities to self-submit and maintain their own directory listing.

- **Built for Call Centers**  
  Primary use case supports call reps handling inbound inquiries when in-network options are unavailable.

- **White-label Friendly**  
  Architecture supports future multi-tenant licensing and isolated deployments.

---

## Tech Stack

- **Frontend:** Vite + React + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Hosting:**  
  - Frontend: Vercel  
  - Backend: Railway

---

## Live Deployment

- **Frontend:** [referouts.com](https://referouts.com)  
- **Backend API:** [https://referouts-production.up.railway.app](https://referouts-production.up.railway.app)

---

## Project Roadmap

- [x] Deploy backend to Railway + connect MongoDB  
- [x] Scaffold frontend with Vite + Tailwind + React Router  
- [x] Confirm backend `/ping` and `/api/referrals` endpoints  
- [ ] Seed provider data to enable matching  
- [ ] Build full-featured Match UI  
- [ ] Build provider submission page  
- [ ] Add weighting/exclusion settings per org  
- [ ] Add B2B networking + lead suggestion logic  
- [ ] Prep for white-label use

---

## Getting Started (Dev Only)

**Frontend:**
```bash
cd client
npm install
npm run dev
