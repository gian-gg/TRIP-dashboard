'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden pt-16 md:pt-20"
      id="hero"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 -top-40 -z-10 md:top-0">
        <div className="from-primary/5 via-background to-background absolute inset-0 bg-gradient-to-br" />
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#186cc7 1px, transparent 1px), linear-gradient(to right, #186cc7 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Headline */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Modern Transit Management for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Cebu
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg sm:text-xl">
            Real-time fleet monitoring, digital payments, and passenger
            management in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="#contact">
              <Button size="lg" className="w-full shadow-xl sm:w-auto">
                Get Started
              </Button>
            </a>
            <a href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </a>
          </div>

          {/* Animated Bus Scene */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative mx-auto mt-12 h-[200px] w-full overflow-hidden md:h-[250px]"
          >
            {/* Gradient fade edges */}
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-gradient-to-r to-transparent md:w-48" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-gradient-to-l to-transparent md:w-48" />
            {/* Multiple Buses */}
            {[
              { yOffset: 0, delay: 0 },
              { yOffset: 40, delay: 3.5 },
              { yOffset: 80, delay: 7 },
            ].map((bus, busIndex) => (
              <motion.div
                key={busIndex}
                animate={{
                  x: [
                    -250,
                    typeof window !== 'undefined' && window.innerWidth > 768
                      ? 1200
                      : 700,
                  ],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: bus.delay,
                  times: [0, 0.05, 0.5, 0.95, 1],
                }}
                className="absolute left-0"
                style={{ bottom: `${bus.yOffset}px`, zIndex: 10 - busIndex }}
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0, -2, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg
                    width="140"
                    height="90"
                    viewBox="0 0 140 90"
                    fill="none"
                    className="drop-shadow-2xl"
                  >
                    {/* Shadow */}
                    <ellipse
                      cx="70"
                      cy="82"
                      rx="50"
                      ry="6"
                      fill="black"
                      opacity="0.15"
                    />

                    {/* Bus Body with gradient */}
                    <defs>
                      <linearGradient
                        id={`busGradient-${busIndex}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#186cc7" />
                      </linearGradient>
                      <linearGradient
                        id={`roofGradient-${busIndex}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                      </linearGradient>
                    </defs>

                    {/* Roof */}
                    <rect
                      x="15"
                      y="18"
                      width="110"
                      height="8"
                      rx="4"
                      fill={`url(#roofGradient-${busIndex})`}
                    />

                    {/* Main Body */}
                    <rect
                      x="10"
                      y="25"
                      width="120"
                      height="48"
                      rx="6"
                      fill={`url(#busGradient-${busIndex})`}
                    />

                    {/* Bottom accent */}
                    <rect x="10" y="65" width="120" height="8" fill="#0f4c8c" />

                    {/* Side Windows */}
                    <rect
                      x="22"
                      y="32"
                      width="18"
                      height="20"
                      rx="2"
                      fill="#dbeafe"
                      opacity="0.95"
                    />
                    <rect
                      x="44"
                      y="32"
                      width="18"
                      height="20"
                      rx="2"
                      fill="#dbeafe"
                      opacity="0.95"
                    />
                    <rect
                      x="66"
                      y="32"
                      width="18"
                      height="20"
                      rx="2"
                      fill="#dbeafe"
                      opacity="0.95"
                    />
                    <rect
                      x="88"
                      y="32"
                      width="18"
                      height="20"
                      rx="2"
                      fill="#dbeafe"
                      opacity="0.95"
                    />

                    {/* Front windshield with reflection */}
                    <path
                      d="M 110 32 L 120 32 L 120 52 L 110 52 Z"
                      fill="#dbeafe"
                      opacity="0.95"
                    />
                    <path
                      d="M 110 32 L 115 35 L 115 49 L 110 52 Z"
                      fill="white"
                      opacity="0.3"
                    />

                    {/* Door */}
                    <rect
                      x="22"
                      y="56"
                      width="18"
                      height="17"
                      rx="2"
                      fill="#0d3d66"
                    />
                    <line
                      x1="31"
                      y1="56"
                      x2="31"
                      y2="73"
                      stroke="#186cc7"
                      strokeWidth="1.5"
                    />
                    <circle cx="25" cy="64" r="1.5" fill="#94a3b8" />

                    {/* Headlights */}
                    <circle cx="122" cy="60" r="3.5" fill="#fef08a">
                      <animate
                        attributeName="opacity"
                        values="1;0.6;1"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="122"
                      cy="68"
                      r="2.5"
                      fill="#ef4444"
                      opacity="0.8"
                    />

                    {/* Side mirror */}
                    <rect
                      x="8"
                      y="38"
                      width="4"
                      height="6"
                      rx="1"
                      fill="#1e293b"
                    />

                    {/* Wheels with CSS rotation animation */}
                    <g>
                      <circle cx="35" cy="76" r="9" fill="#1f2937" />
                      <circle cx="35" cy="76" r="8" fill="#374151" />
                      <g className="origin-[35px_76px] animate-spin">
                        <line
                          x1="35"
                          y1="68"
                          x2="35"
                          y2="84"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="27"
                          y1="76"
                          x2="43"
                          y2="76"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                        />
                      </g>
                      <circle cx="35" cy="76" r="4" fill="#9ca3af" />
                    </g>

                    <g>
                      <circle cx="100" cy="76" r="9" fill="#1f2937" />
                      <circle cx="100" cy="76" r="8" fill="#374151" />
                      <g className="origin-[100px_76px] animate-spin">
                        <line
                          x1="100"
                          y1="68"
                          x2="100"
                          y2="84"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="92"
                          y1="76"
                          x2="108"
                          y2="76"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                        />
                      </g>
                      <circle cx="100" cy="76" r="4" fill="#9ca3af" />
                    </g>

                    {/* Window dividers for detail */}
                    <line
                      x1="22"
                      y1="32"
                      x2="22"
                      y2="52"
                      stroke="#186cc7"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="44"
                      y1="32"
                      x2="44"
                      y2="52"
                      stroke="#186cc7"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="66"
                      y1="32"
                      x2="66"
                      y2="52"
                      stroke="#186cc7"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="88"
                      y1="32"
                      x2="88"
                      y2="52"
                      stroke="#186cc7"
                      strokeWidth="0.5"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="border-foreground/20 flex h-8 w-5 items-start justify-center rounded-full border p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-foreground/40 h-1.5 w-1.5 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
