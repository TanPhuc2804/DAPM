import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        id: '',
        email: '',
        name: ''
    }
});

export const AuthWrapper = ({ children }) => {
    const storedAuthData = JSON.parse(localStorage.getItem('authData'));

    const [auth, setAuth] = useState(storedAuthData || {
        isAuthenticated: false,
        user: {
            id: '',
            name: '',
            email: ''
        }
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
