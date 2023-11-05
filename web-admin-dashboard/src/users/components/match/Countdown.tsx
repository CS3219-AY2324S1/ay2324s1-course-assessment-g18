import React, { useState, useEffect, useRef } from "react";

function Countdown() {
  const refInstance = useRef<number | null>(null);
  const [counter, setCountdown] = useState<string>("00:00:00");

  const getCounter = (e: string) => {
    const all = Date.parse(e) - Date.parse(new Date());
    const s = Math.floor((all / 1000) % 60);
    const m = Math.floor((all / 1000 / 60) % 60);
    const h = Math.floor((all / 1000 / 60 / 60) % 24);
    return {
      all,
      s,
      m,
      h,
    };
  };

  const initCounter = (e: string) => {
    const { all, s } = getCounter(e);
    if (all >= 0) {
      setCountdown(s.toString() + "s");
    }
  };

  const reset = (e: string) => {
    setCountdown("30s");
    if (refInstance.current) clearInterval(refInstance.current);
    const id = setInterval(() => {
      initCounter(e);
    }, 1000);
    refInstance.current = id;
  };

  const voidTime = () => {
    const voidZone = new Date();
    voidZone.setSeconds(voidZone.getSeconds() + 30);
    return voidZone.toISOString();
  };

  useEffect(() => {
    reset(voidTime());
  }, []);

  return (
    <>
      <h1 className="h1 alert alert-info text-center">{counter}</h1>
      <div className="d-grid"></div>
    </>
  );
}

export default Countdown;
