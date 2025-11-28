import useAuthorized from '@/hooks/use-authorized';
import { SignIn } from './components/SignIn';
import Loading from '@/components/Loading';

function App() {
  const { loading } = useAuthorized();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-trip-primary-light/40 flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-trip-primary text-md flex items-center gap-2 font-extrabold">
        <img
          src="./logo.png"
          alt="TRIP Logo"
          className="h-6 w-6"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <span className="bg-trip-primary/20 h-3 w-[2px]" /> TRIP
      </h1>
      <SignIn />
      <p className="text-muted-foreground mt-2 text-xs">
        © 2025 TRIP. All Rights Reserved.
      </p>
    </div>
  );
}

export default App;
