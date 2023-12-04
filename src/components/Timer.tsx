"use client";

import React, { useEffect, useState } from "react";

const start = new Date("11/20/2023").getTime();

const formatCountdown = (t: number) => {
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((t % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s `;
};

// TODO: Extract formatted time string to state and add effect that updates it every second
// To avoid hydration errors, initial state must be static and only updated for the first time inside the effect
const Countdown = () => {
  const [remaining, setRemaining] = useState("Loading...");
  useEffect(() => {
    const interval = setInterval(
      () => setRemaining(formatCountdown(new Date().getTime() - start)),
      1000,
    );
    return () => {
      interval.unref;
    };
  }, [setRemaining]);
  return <p className="text-9xl">{remaining}</p>;
};

export default Countdown;
