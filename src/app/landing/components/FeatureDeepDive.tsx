'use client';

import { motion } from 'framer-motion';
import {
  QrCode,
  Hand,
  MessageCircle,
  BarChart3,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FeatureDeepDive() {
  const transitNodeFeatures = [
    {
      icon: QrCode,
      title: 'QR Code Payments',
      description:
        'Instant cashless payments via QR codes. Passengers scan, pay, and board in seconds.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Hand,
      title: 'One-Tap Stop Requests',
      description:
        'Passengers request stops with a single tap. No more shouting or missed stops.',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      icon: MessageCircle,
      title: 'Conductor Interface',
      description:
        'Simple interface for conductors to upload trip data. Secure, encrypted submission after each trip.',
      gradient: 'from-teal-500 to-green-500',
    },
  ];

  const fleetCommandFeatures = [
    {
      icon: Shield,
      title: 'Data Encryption & Security',
      description:
        'End-to-end encryption prevents data tampering. Conductors and passengers cannot modify trip data, eliminating fare evasion.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Post-Trip Analytics',
      description:
        'Trip data syncs to the dashboard after each journey. Analyze revenue per route, per bus, and identify trends.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: TrendingUp,
      title: 'Revenue Tracking',
      description:
        'Comprehensive financial reports updated after each trip. Track earnings, payment methods, and passenger categories.',
      gradient: 'from-rose-500 to-orange-500',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Transit Node Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          {/* Header */}
          <div className="mb-12 text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-700">
              <span>🚌</span> Product 1
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              The Transit Node
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg lg:mx-0">
              Transform every bus into a smart terminal. The Transit Node is
              deployed on each bus, creating a seamless digital experience for
              passengers and conductors.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {transitNodeFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="group h-full transition-shadow hover:shadow-xl">
                  <CardHeader>
                    <div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform group-hover:scale-110`}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Visual Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card/50 mt-12 overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-8 md:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold">
                    Passenger Experience Reimagined
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Board the bus, scan the QR code at your seat, pay with your
                    preferred method, and request your stop—all from your phone
                    or the in-bus terminal.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-background/80 rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                      ⚡ 3-Second Boarding
                    </div>
                    <div className="bg-background/80 rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                      💳 Multiple Payment Options
                    </div>
                    <div className="bg-background/80 rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                      🎯 Never Miss a Stop
                    </div>
                  </div>
                </div>
                <div className="bg-background/80 flex aspect-video items-center justify-center rounded-xl border backdrop-blur-sm">
                  <div className="text-muted-foreground text-center">
                    <QrCode className="mx-auto mb-2 h-16 w-16" />
                    <p className="text-sm font-medium">
                      Interactive Demo Placeholder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Fleet Command Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-700">
              <span>🏢</span> Product 2
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              The Fleet Command
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg lg:mx-0">
              Your operational command center. Analyze performance and make
              informed decisions with comprehensive trip data collected after
              each journey.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fleetCommandFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="group h-full transition-shadow hover:shadow-xl">
                  <CardHeader>
                    <div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform group-hover:scale-110`}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Visual Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card/50 mt-12 overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 md:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="bg-background/80 flex aspect-video items-center justify-center rounded-xl border backdrop-blur-sm">
                  <div className="text-muted-foreground text-center">
                    <BarChart3 className="mx-auto mb-2 h-16 w-16" />
                    <p className="text-sm font-medium">Dashboard Preview</p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold">
                    Complete Operational Visibility
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    From a single screen, analyze trip data, monitor revenue
                    trends, and track fleet performance. Make decisions based on
                    comprehensive data collected from every journey.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-background/80 rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                      📊 Trip Analytics
                    </div>
                    <div className="bg-background/80 rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                      🔒 Encrypted Data
                    </div>
                    <div className="bg-background/80 rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                      📈 Revenue Reports
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
