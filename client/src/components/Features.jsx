export default function Features() {
  const features = [
    {
      title: "Inefficient referrals",
      desc: "Say goodbye to manual, time-consuming processes",
      icon: "⛔"
    },
    {
      title: "Streamlined matching",
      desc: "Find the best providers for your patients’ needs",
      icon: "✅"
    },
    {
      title: "Automated tracking",
      desc: "Monitor referral progress from start to finish",
      icon: "⏱"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-center text-3xl font-serif mb-12">How It Works</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map(({ title, desc, icon }) => (
          <div key={title}>
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}