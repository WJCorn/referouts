export default function Contact() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-left text-sm text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We’d love to hear from you. Please reach out using the info below.
      </p>

      <div className="space-y-4 mb-10">
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:info@referouts.com" className="underline text-primary">
            info@referouts.com
          </a>
        </p>
      </div>
    </div>
  );
}
