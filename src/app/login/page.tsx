import useAuthorized from '@/hooks/use-authorized';
import { SignIn } from './components/SignIn';
import Loading from '@/components/Loading';

function App() {
  const { loading } = useAuthorized();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Gradient matching landing page */}
      <div className="absolute inset-0 -z-10">
        <div className="from-primary/5 via-background to-background absolute inset-0 bg-gradient-to-br" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#186cc7 1px, transparent 1px), linear-gradient(to right, #186cc7 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <img
          src="./logo.png"
          alt="TRIP Logo"
          className="h-10 w-10 md:h-12 md:w-12"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <span className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
          TRIP
        </span>
      </div>

      {/* Sign In Card */}
      <SignIn />

      {/* Footer */}
      <p className="text-muted-foreground mt-6 text-sm">
        © 2025 TRIP. All Rights Reserved.
      </p>
    </div>
  );
}

export default App;
