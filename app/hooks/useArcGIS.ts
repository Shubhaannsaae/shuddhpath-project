import { useState, useEffect } from 'react';
import { arcgisAuth } from '@/lib/arcgis';
import Portal from "@arcgis/core/portal/Portal";

export function useArcGIS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [portal, setPortal] = useState<Portal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const isSignedIn = await arcgisAuth.checkSignInStatus();
      
      if (isSignedIn) {
        const portalInstance = arcgisAuth.getPortal();
        if (portalInstance) {
          setPortal(portalInstance);
          setIsAuthenticated(true);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication check failed');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const portalInstance = await arcgisAuth.signIn();
      setPortal(portalInstance);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await arcgisAuth.signOut();
      setPortal(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
    }
  };

  return {
    isAuthenticated,
    portal,
    loading,
    error,
    signIn,
    signOut
  };
}
