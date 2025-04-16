import { Spinner } from "flowbite-react";
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * @description This is used to protect the routes in the application
 * @param {object} children - The children components to render
 */

export default function RouteProtection ({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    function checkAuth() {
      // Create and define the public routes for the UI that users can access without even login
      const publicRoutes = [
        '/edlm-portal/',
        '/edlm-portal/login/',
        '/edlm-portal/register/',
        '/edlm-portal/403/',
        '/edlm-portal/401/',
      ];
      const path = router.asPath;

      // Check if the user is logged in and the path is public routes or not
      if (!publicRoutes.includes(path) && !user) {
        // If the user is not logged in and not a public url
        // Redirect to the 401 unauthorzied page
        setAuthorized(false);
        router.push('/edlm-portal/401');
      } else if ((path.includes('/login') || path.includes('/register')) && user) {
        // If the user is logged in and trying to get to the login or register page
        // Redirect to the edlm-portal page
        router.push('/edlm-portal');
      } else {
        setAuthorized(true);
      }
    }
    checkAuth();

    const handleRouteChange = () => checkAuth();

    // Fires when the route changed completely
    router.events.on('routeChangeComplete', handleRouteChange);

    // When the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [user, router]);

  return (
    <>
      {authorized ? (
        children
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Spinner color="purple" aria-label="Purple spinner example" />
        </div>
      )}
    </>
  );
}