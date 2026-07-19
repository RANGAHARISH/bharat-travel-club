export function StatsStrip() {
  const stats = [
    { number: "500+", label: "Trips Completed" },
    { number: "10,000+", label: "Happy Travellers" },
    { number: "50+", label: "Destinations" },
    { number: "4.8", label: "Average Rating" },
  ];

  return (
    <section className="bg-brand-teal py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
