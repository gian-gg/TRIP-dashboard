import { motion } from 'framer-motion';
import { X, Check, TrendingUp, Zap, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ProblemSolution() {
  const problems = [
    {
      icon: X,
      title: 'Manual Processes',
      description: 'Paper tickets and manual counting waste time and resources',
      color: 'text-red-500',
    },
    {
      icon: X,
      title: 'Cash-Only Payments',
      description: 'Limited payment options reduce passenger convenience',
      color: 'text-red-500',
    },
    {
      icon: X,
      title: 'No Real-Time Data',
      description: 'Operators lack visibility into fleet operations',
      color: 'text-red-500',
    },
  ];

  const solutions = [
    {
      icon: Check,
      title: 'Digital Automation',
      description: 'Paperless transactions with instant data synchronization',
      color: 'text-green-500',
    },
    {
      icon: Zap,
      title: 'Multiple Payment Options',
      description:
        'Cash, QR codes, and digital wallets for maximum flexibility',
      color: 'text-green-500',
    },
    {
      icon: TrendingUp,
      title: 'Live Dashboard',
      description: 'Real-time fleet monitoring and revenue analytics',
      color: 'text-green-500',
    },
  ];

  return (
    <section id="solutions" className="bg-muted/30 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            From Chaos to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Clarity
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            See how TRIP transforms the traditional bus transit system into a
            modern, data-driven operation.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <Clock className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">The Old Way</h3>
                <p className="text-muted-foreground text-sm">
                  Inefficient & Manual
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="border-red-500/20 bg-red-500/5">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div
                        className={`${problem.color} flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10`}
                      >
                        <problem.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">{problem.title}</h4>
                        <p className="text-muted-foreground text-sm">
                          {problem.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Solution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Our Solution</h3>
                <p className="text-muted-foreground text-sm">
                  Digital & Data-Driven
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="flex items-start gap-4 p-4">
                      <div
                        className={`${solution.color} bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg`}
                      >
                        <solution.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">{solution.title}</h4>
                        <p className="text-muted-foreground text-sm">
                          {solution.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
