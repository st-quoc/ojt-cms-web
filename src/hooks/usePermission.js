import { useState, useEffect } from 'react';

export const usePermission = requiredPermissions => {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo && userInfo.permissions) {
      const userPermissions = userInfo.permissions;

      const hasRequiredPermissions = requiredPermissions.every(permission =>
        userPermissions.includes(permission),
      );

      setHasPermission(hasRequiredPermissions);
    } else {
      setHasPermission(false);
    }

    setLoading(false);
  }, [requiredPermissions]);

  return { hasPermission, loading };
};
