import React from "react";
import "./night-sky-background.css";

export function NightSkyBackground(): React.ReactElement {
  return (
    <div className="paa-night-sky-bg" aria-hidden="true">
      {/* Deep Ambient Nebula Glow */}
      <div className="paa-sky-nebula" />

      {/* Twinkling Star Layer */}
      <div className="paa-star-field" />

      {/* Surveyor Precision Crosshairs (+) */}
      <div className="paa-surveyor-nodes" />

      {/* Shooting Gold Comets */}
      <div className="paa-sky-comet paa-comet--1" />
      <div className="paa-sky-comet paa-comet--2" />
      <div className="paa-sky-comet paa-comet--3" />
      <div className="paa-sky-comet paa-comet--4" />
    </div>
  );
}