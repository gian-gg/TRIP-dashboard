import { motion } from 'framer-motion';

export function TrustPartners() {
  const partners = [
    { name: 'Ceres Liner' },
    { name: 'Sunrays Bus' },
    { name: 'Sugbo Transit' },
    { name: 'MyBus' },
    { name: 'Ceres Tours' },
    { name: 'Cebu South Bus' },
  ];

  return (
    <section id="partners" className="border-border border-y py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
            Trusted by Cebu's Leading Transit Companies
          </h2>
        </motion.div>

        {/* Logo Marquee */}
        <div className="relative overflow-hidden">
          <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r to-transparent" />
          <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l to-transparent" />

          <div className="flex">
            <motion.div
              animate={{
                x: ['0%', '-100%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
              className="flex shrink-0 gap-8 pr-8"
            >
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-muted flex h-20 min-w-[180px] items-center justify-center rounded-lg border"
                >
                  <span className="text-foreground/70 text-base font-semibold">
                    {partner.name}
                  </span>
                </div>
              ))}
            </motion.div>
            <motion.div
              animate={{
                x: ['0%', '-100%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
              className="flex shrink-0 gap-8 pr-8"
            >
              {partners.map((partner, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="bg-muted flex h-20 min-w-[180px] items-center justify-center rounded-lg border"
                >
                  <span className="text-foreground/70 text-base font-semibold">
                    {partner.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
