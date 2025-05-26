export default function PrivacyPolicy() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-left text-sm text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p><strong>Last updated:</strong> May 26, 2025</p>

      <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
      <p>Referouts ("we", "our", or "us") respects your privacy. This Privacy Policy describes how we collect, use, and protect your information when you use our website and services.</p>

      <h2 className="text-xl font-semibold mt-6">2. Information We Collect</h2>
      <ul className="list-disc pl-6">
        <li>Name, email, organization, and phone number (via early access form)</li>
        <li>Account info (via Clerk authentication)</li>
        <li>Facility and provider data submitted by users</li>
        <li>Usage data and browser information (analytics and session tracking)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">3. How We Use Your Information</h2>
      <ul className="list-disc pl-6">
        <li>To operate and improve our services</li>
        <li>To contact you regarding platform updates</li>
        <li>To display submitted provider information to other users</li>
        <li>To comply with legal requirements</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">4. Sharing of Information</h2>
      <p>We do not sell your information. We may share it with third-party service providers (such as Clerk, MongoDB, and analytics tools) to operate our platform, or when legally required.</p>

      <h2 className="text-xl font-semibold mt-6">5. Your Rights</h2>
      <p>You may request access to or deletion of your personal data by emailing <a href="mailto:info@referouts.com" className="underline text-primary">info@referouts.com</a>.</p>

      <h2 className="text-xl font-semibold mt-6">6. Data Security</h2>
      <p>We take reasonable measures to protect your information through secure HTTPS connections, encrypted storage, and access controls.</p>

      <h2 className="text-xl font-semibold mt-6">7. Changes to This Policy</h2>
      <p>We may update this Privacy Policy. Changes will be posted here and reflected by the updated date above.</p>

      <h2 className="text-xl font-semibold mt-6">8. Contact Us</h2>
      <p>If you have any questions, contact us at <a href="mailto:info@referouts.com" className="underline text-primary">info@referouts.com</a>.</p>
    </div>
  );
}
