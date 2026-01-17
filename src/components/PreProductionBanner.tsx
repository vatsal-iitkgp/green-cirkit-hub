export default function PreProductionBanner() {
  return (
    <section className="w-full bg-green-50 border-b border-green-200 mt-14">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center">
        <h2 className="text-base md:text-lg font-semibold text-green-900">
          Pre-Production Phase
        </h2>

        <p className="mt-1 text-sm text-green-800 max-w-4xl mx-auto leading-relaxed">
          GreenCirkit is currently in the pre-production stage. We are finalising
          recycling machinery and preparing operational infrastructure.
        </p>

        <p className="mt-1 text-xs text-green-700">
          We are actively engaging with PIBOs, suppliers, and ecosystem partners.
        </p>
      </div>
    </section>
  );
}
