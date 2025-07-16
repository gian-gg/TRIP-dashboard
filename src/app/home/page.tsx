import { useAuthorized } from '@/lib/auth';
import { SignIn } from './components/SignIn';
import Loading from '@/components/Loading';

function App() {
  const { loading } = useAuthorized();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-trip-primary-light/40 flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}

export default App;
