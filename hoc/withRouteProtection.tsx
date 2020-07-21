import React from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/router';

type ProtectionType = 'AUTHENTICATED_ONLY' | 'UNAUTHENTICATED_ONLY';

function withRouteProtection<P extends {} = {}>(
  Component: React.FC<P> | React.ComponentClass<P>,
  protectionType: ProtectionType = 'AUTHENTICATED_ONLY'
) {
  return (props: P) => {
    const { loading, authenticated } = useAuth();
    const router = useRouter();
    React.useEffect(() => {
      if (
        protectionType === 'AUTHENTICATED_ONLY' &&
        !loading &&
        !authenticated
      ) {
        router.push(`/login`);
      } else if (
        protectionType === 'UNAUTHENTICATED_ONLY' &&
        !loading &&
        authenticated
      ) {
        router.replace('/');
      }
    }, [loading, authenticated, router]);
    return <Component {...props} />;
  };
}

export default withRouteProtection;
