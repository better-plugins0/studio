import { HeartHandshake, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    name: 'Top-Tier Quality',
    description: 'Every plugin is hand-crafted for stability, performance, and compatibility, ensuring a seamless experience for your server.',
    icon: ShieldCheck,
  },
  {
    name: 'Performance First',
    description: 'Our plugins are built from the ground up to be lightweight and efficient, so you never have to sacrifice performance for features.',
    icon: Zap,
  },
  {
    name: 'Dedicated Support',
    description: 'Run into an issue? Our friendly support team is always available on our Discord to help you get things running smoothly.',
    icon: HeartHandshake,
  },
];

export function Features() {
  return (
    <section id="features">
      <div className="space-y-4 text-center mb-12">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Why BetterPlugins?
        </h2>
        <p className="text-lg text-muted-foreground">
          Everything you need for a modern Minecraft server.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.name} className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 border border-border transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <feature.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-headline text-lg font-semibold">{feature.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
