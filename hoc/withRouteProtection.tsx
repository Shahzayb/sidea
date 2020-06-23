import React, { useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/router';

type ProtectionType = 'AUTHENTICATED_ONLY' | 'UNAUTHENTICATED_ONLY';

const withRouteProtection = (
  Component: React.FC,
  protectionType: ProtectionType = 'AUTHENTICATED_ONLY'
) => {
  return () => {
    const { loading, authenticated } = useAuth();
    const router = useRouter();
    React.useEffect(() => {
      if (
        protectionType === 'AUTHENTICATED_ONLY' &&
        !loading &&
        !authenticated
      ) {
        const path = router.asPath;
        router.push(`/login?next=${path}`);
      } else if (
        protectionType === 'UNAUTHENTICATED_ONLY' &&
        !loading &&
        authenticated
      ) {
        router.replace('/');
      }
    }, [loading, authenticated, router]);
    return <Component />;
  };
};

export default withRouteProtection;
