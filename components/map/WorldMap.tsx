"use client";

import { useEffect, useRef } from "react";
import { CATEGORY_COLOR_VAR, type Category } from "@/lib/content/categories";

type MapPoint = {
  slug: string;
  lat: number;
  lng: number;
  category: Category;
};

const LAND: number[][][] = [
  // North America
  [[-165,68],[-165,60],[-140,60],[-130,55],[-125,48],[-124,40],[-117,32],[-105,20],[-97,16],[-90,14],[-84,9],[-80,8],[-77,8],[-81,25],[-97,26],[-97,30],[-90,30],[-81,31],[-75,35],[-70,41],[-66,44],[-60,46],[-55,47],[-52,47],[-55,52],[-60,55],[-65,60],[-75,62],[-85,66],[-95,68],[-110,70],[-130,70],[-150,71],[-165,68]],
  // South America
  [[-79,9],[-77,4],[-75,0],[-79,-4],[-81,-6],[-80,-15],[-75,-20],[-70,-25],[-70,-33],[-73,-40],[-75,-46],[-73,-52],[-68,-55],[-65,-55],[-62,-50],[-58,-38],[-57,-35],[-48,-25],[-40,-15],[-35,-8],[-38,-5],[-45,0],[-50,2],[-60,5],[-67,8],[-72,10],[-79,9]],
  // Africa
  [[-17,15],[-16,12],[-13,8],[-10,5],[-5,5],[3,6],[9,4],[9,-2],[12,-6],[13,-12],[12,-17],[14,-22],[18,-28],[18,-34],[25,-34],[30,-30],[32,-26],[35,-22],[40,-15],[43,-11],[51,-12],[48,0],[43,3],[45,10],[50,12],[43,12],[38,15],[35,20],[33,25],[32,31],[25,31],[15,32],[9,37],[0,35],[-6,33],[-10,30],[-15,25],[-17,21],[-17,15]],
  // Europe
  [[-9,43],[-9,36],[-6,36],[0,38],[3,42],[8,44],[12,45],[13,42],[16,40],[20,40],[23,36],[23,40],[28,41],[30,45],[28,46],[24,48],[22,52],[28,54],[24,56],[28,60],[24,65],[20,69],[10,68],[5,62],[8,58],[5,58],[8,55],[5,53],[3,51],[0,50],[-2,49],[-5,48],[-4,48],[-1,46],[-2,44],[-9,43]],
  // Asia
  [[28,41],[35,37],[44,38],[48,40],[52,45],[60,45],[66,50],[70,55],[80,60],[90,68],[110,72],[130,72],[140,70],[150,65],[160,62],[170,65],[179,66],[170,60],[160,55],[150,45],[142,45],[140,36],[130,35],[126,38],[129,40],[124,40],[122,32],[120,25],[112,22],[108,16],[105,10],[100,6],[95,15],[88,22],[80,17],[76,10],[78,20],[72,22],[68,24],[62,25],[58,28],[50,30],[44,33],[36,36],[28,41]],
  // Australia
  [[113,-22],[115,-20],[122,-18],[129,-15],[136,-12],[142,-11],[145,-16],[148,-20],[153,-27],[151,-33],[150,-37],[146,-38],[140,-38],[137,-35],[135,-32],[131,-32],[126,-32],[122,-34],[115,-34],[113,-25],[113,-22]],
];

function project(lat: number, lon: number, w: number, h: number) {
  return { x: ((lon + 180) / 360) * w, y: ((90 - lat) / 180) * h };
}

function readVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function WorldMap({
  points,
  userCoords,
}: {
  points: MapPoint[];
  userCoords: { lat: number; lng: number } | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const gridLine = readVar("--color-grid-line") || "#ccc";
      const gridStrong = readVar("--color-grid-strong") || "#999";
      const land = readVar("--color-land") || "#ccc";
      const accent = readVar("--color-accent") || "#5c7a6c";

      ctx.strokeStyle = gridLine;
      ctx.lineWidth = 1;
      for (let lon = -180; lon <= 180; lon += 30) {
        const p1 = project(90, lon, w, h);
        const p2 = project(-90, lon, w, h);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      for (let lat = -60; lat <= 60; lat += 30) {
        const p1 = project(lat, -180, w, h);
        const p2 = project(lat, 180, w, h);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.strokeStyle = gridStrong;
      const equator = project(0, 0, w, h);
      ctx.beginPath();
      ctx.moveTo(0, equator.y);
      ctx.lineTo(w, equator.y);
      ctx.stroke();

      ctx.fillStyle = land;
      LAND.forEach((poly) => {
        ctx.beginPath();
        poly.forEach(([lon, lat], i) => {
          const p = project(lat, lon, w, h);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fill();
      });

      points.forEach((pt) => {
        const p = project(pt.lat, pt.lng, w, h);
        const color = readVar(CATEGORY_COLOR_VAR[pt.category]) || accent;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = readVar("--color-surface") || "#fff";
        ctx.stroke();
      });

      if (userCoords) {
        const p = project(userCoords.lat, userCoords.lng, w, h);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", draw);
    const themeObserver = new MutationObserver(draw);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
      mql.removeEventListener("change", draw);
      themeObserver.disconnect();
    };
  }, [points, userCoords]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-[340px] bg-chart-bg"
      role="img"
      aria-label="World map showing the location of indexed places"
    />
  );
}
