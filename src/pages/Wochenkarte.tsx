import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Wochenkarte = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page menu section
    navigate("/#menu", { replace: true });
  }, [navigate]);

  return null;
};

export default Wochenkarte;
