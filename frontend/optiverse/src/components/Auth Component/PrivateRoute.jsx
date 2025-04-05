import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../services/Api";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
  
      try {
        const response = await verifyToken(token);
        setIsChecking(false);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };
  
    checkAuth();
  }, []);
  

  if (isChecking) return <div className="text-center mt-10 text-lg">Checking session...</div>;

  return children;
};

export default PrivateRoute;
