import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useDecodedToken  = () => {
    const[username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
           try {
            const decodeToken = jwtDecode(token);
            setUsername(decodeToken.username);
           } catch (error) {
            console.log("Error decoding token:", error);
            setUsername(null);
           }
        }
    }, [])
    
    return username;
};