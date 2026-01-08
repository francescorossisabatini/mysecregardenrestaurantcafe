import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spaisekarte = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page menu section
    navigate("/#menu", { replace: true });
  }, [navigate]);

  return null;
};

export default Spaisekarte;
