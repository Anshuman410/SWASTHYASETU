import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { initialUsers } from '../data/seedData';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  users: User[];
  loginWithCredentials: (emailOrPhone: string, pass: string) => User | null;
  logout: () => void;
  registerUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('swasthya_users_db');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('swasthya_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return currentUser ? currentUser.role : 'patient';
  });

  useEffect(() => {
    localStorage.setItem('swasthya_users_db', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('swasthya_user', JSON.stringify(currentUser));
      setCurrentRole(currentUser.role);
    } else {
      localStorage.removeItem('swasthya_user');
      setCurrentRole('patient');
    }
  }, [currentUser]);

  const loginWithCredentials = (emailOrPhone: string, pass: string): User | null => {
    const found = users.find(u => 
      (u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone) &&
      u.password === pass
    );

    if (found) {
      setCurrentUser(found);
      return found;
    }
    return null;
  };

  const registerUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      currentRole,
      users,
      loginWithCredentials,
      logout,
      registerUser
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
