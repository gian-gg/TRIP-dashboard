import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/lib/auth';
import { SignIn } from './components/SignIn';
import Loading from '@/components/Loading';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onMount() {
      const user = await getUser();
      if (user) {
        navigate('/dashboard');
      }
      setIsLoading(false);
    }
    onMount();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-trip-primary-light/40 flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}

export default App;
