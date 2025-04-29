// context/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <AppContext.Provider 
      value={{ 
        currentUser, 
        setCurrentUser, 
        notifications, 
        addNotification, 
        clearNotifications,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};