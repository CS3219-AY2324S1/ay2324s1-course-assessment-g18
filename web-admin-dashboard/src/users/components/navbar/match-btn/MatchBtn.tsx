import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MatchDialog from "../../match/MatchDialog";
import { useNavigate } from "react-router-dom";
import "../Navbar.css";
import { Button } from "@/components/ui/button";

function MatchBtn() {
  const navigate = useNavigate();
  return (
    <div className="match-btn" onClick={() => navigate("/choose-match")}>
      Match
    </div>
  );
}

export default MatchBtn;
