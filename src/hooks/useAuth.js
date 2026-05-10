import { useReducer, useCallback, useEffect } from 'react';
import { authReducer, initialState } from '../reducers/authReducer';

export function useAuth() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
        return { success: true };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  }, []);

  const signup = useCallback(async (userData) => {
    dispatch({ type: 'SIGNUP_REQUEST' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find(u => u.email === userData.email)) {
        throw new Error('User already exists with this email');
      }
      
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      const { password, ...userWithoutPassword } = newUser;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      dispatch({ type: 'SIGNUP_SUCCESS', payload: userWithoutPassword });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SIGNUP_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('currentUser');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const checkAuth = useCallback(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && !state.isAuthenticated) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(currentUser) });
    }
  }, [state.isAuthenticated]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    authState: state,
    login,
    signup,
    logout,
    checkAuth
  };
}