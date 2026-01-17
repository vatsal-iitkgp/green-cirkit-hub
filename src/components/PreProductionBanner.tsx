export default function PreProductionBanner() {
  return (
    <section className="w-full bg-green-100 border-b border-green-300">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-green-900">
          Pre-Production Phase
        </h2>

        <p className="mt-3 text-base md:text-lg text-green-800 max-w-3xl mx-auto">
          Green Cirkit is currently in the pre-production stage. We are finalising
          recycling machinery and preparing operational infrastructure.
          Commercial recycling operations will commence shortly, following
          commissioning and compliance readiness.
        </p>

        <p className="mt-2 text-sm text-green-700">
          We are actively engaging with PIBOs, suppliers, and ecosystem partners during this phase.
        </p>
      </div>
    </section>
  );
}
