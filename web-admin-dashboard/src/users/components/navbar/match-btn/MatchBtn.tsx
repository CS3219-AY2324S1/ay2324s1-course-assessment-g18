
import { useNavigate } from "react-router-dom";
import "../Navbar.css";


function MatchBtn() {
  const navigate = useNavigate();
  return (
    <div className="match-btn" onClick={() => navigate("/choose-match")}>
      Match
    </div>
  );
}

export default MatchBtn;
