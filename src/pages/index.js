import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RootRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/edlm-portal');
  }, [router]);
  
  return <div>Redirecting to EDLM Portal</div>;
}