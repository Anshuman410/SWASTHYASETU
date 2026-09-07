import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { initialUsers } from '../data/seedData';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  loginAsDemoUser: (role: UserRole) => void;
  loginWithCredentials: (emailOrPhone: string, pass: string, role: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('swasthya_user');
    return saved ? JSON.parse(saved) : initialUsers[1]; // Default to Health Worker Sunita Devi for easy demo
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return currentUser ? currentUser.role : 'health-worker';
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('swasthya_user', JSON.stringify(currentUser));
      setCurrentRole(currentUser.role);
    } else {
      localStorage.removeItem('swasthya_user');
    }
  }, [currentUser]);

  const loginAsDemoUser = (role: UserRole) => {
    const found = initialUsers.find(u => u.role === role) || {
      id: `usr-demo-${role}`,
      name: `Demo ${role.toUpperCase()} User`,
      email: `${role}@swasthya.gov.in`,
      phone: '+91 90000 00000',
      role: role
    };
    setCurrentUser(found);
  };

  const loginWithCredentials = (emailOrPhone: string, pass: string, role: UserRole): boolean => {
    loginAsDemoUser(role);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    loginAsDemoUser(role);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      currentRole,
      loginAsDemoUser,
      loginWithCredentials,
      logout,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
