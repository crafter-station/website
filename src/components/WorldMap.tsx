"use client";

import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import { feature } from "topojson-client";

interface Location {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
}

interface WorldMapProps {
  locations: Location[];
}

// Country codes for highlighting (ISO 3166-1 numeric)
const HIGHLIGHT_COUNTRIES: Record<string, string> = {
  "604": "Peru",
  "170": "Colombia",
  "076": "Brazil",
  "724": "Spain",
};

const WIDTH = 960;
const HEIGHT = 500;

export function WorldMap({ locations }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load TopoJSON data
  useEffect(() => {
    fetch("/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        setWorldData(data);
        setIsLoaded(true);
      })
      .catch(console.error);
  }, []);

  // Create projection centered on Atlantic (to show both Americas and Europe)
  const projection = useMemo(() => {
    return d3
      .geoNaturalEarth1()
      .scale(180)
      .center([-30, 10])
      .translate([WIDTH / 2, HEIGHT / 2]);
  }, []);

  const geoPath = useMemo(() => d3.geoPath().projection(projection), [projection]);

  // Convert TopoJSON to GeoJSON features
  const countries = useMemo(() => {
    if (!worldData) return [];
    return feature(worldData, worldData.objects.countries).features;
  }, [worldData]);

  // Get country IDs that should be highlighted
  const highlightedCountryIds = useMemo(() => {
    return new Set(locations.map((loc) => loc.countryCode));
  }, [locations]);

  // Project locations to screen coordinates
  const projectedLocations = useMemo(() => {
    return locations.map((loc) => {
      const coords = projection([loc.lng, loc.lat]);
      return {
        ...loc,
        x: coords?.[0] ?? 0,
        y: coords?.[1] ?? 0,
      };
    });
  }, [locations, projection]);

  const hqLocation = projectedLocations.find((loc) => loc.isHQ);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex gap-1">
          <span className="size-2 rounded-full bg-primary/60 animate-pulse" />
          <span className="size-2 rounded-full bg-primary/60 animate-pulse [animation-delay:150ms]" />
          <span className="size-2 rounded-full bg-primary/60 animate-pulse [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter for markers */}
          <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Gradient for highlighted countries */}
          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Ocean background */}
        <rect width={WIDTH} height={HEIGHT} fill="#0a0a0a" />

        {/* Subtle grid */}
        <g stroke="#1a1a1a" strokeWidth="0.5" opacity="0.5">
          {[-60, -30, 0, 30, 60].map((lat) => (
            <path
              key={`lat-${lat}`}
              d={geoPath(d3.geoGraticule().extent([[-180, lat], [180, lat + 0.1]])()) || ""}
              fill="none"
            />
          ))}
          {[-120, -90, -60, -30, 0, 30, 60].map((lng) => (
            <path
              key={`lng-${lng}`}
              d={geoPath(d3.geoGraticule().extent([[lng, -90], [lng + 0.1, 90]])()) || ""}
              fill="none"
            />
          ))}
        </g>

        {/* Country shapes */}
        <g>
          {countries.map((country: any) => {
            const isHighlighted = highlightedCountryIds.has(country.id);
            return (
              <path
                key={country.id}
                d={geoPath(country) || ""}
                fill={isHighlighted ? "url(#highlightGradient)" : "#1a1a1a"}
                stroke={isHighlighted ? "#FFD700" : "#333"}
                strokeWidth={isHighlighted ? 1 : 0.5}
                opacity={isHighlighted ? 1 : 0.6}
                className="transition-all duration-300"
              />
            );
          })}
        </g>

        {/* Connection lines from HQ */}
        {hqLocation && (
          <g>
            {projectedLocations
              .filter((loc) => !loc.isHQ)
              .map((loc) => {
                // Create curved path
                const midX = (hqLocation.x + loc.x) / 2;
                const midY = Math.min(hqLocation.y, loc.y) - 30;
                return (
                  <g key={`connection-${loc.city}`}>
                    {/* Connection line */}
                    <path
                      d={`M ${hqLocation.x} ${hqLocation.y} Q ${midX} ${midY} ${loc.x} ${loc.y}`}
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="1"
                      opacity="0.4"
                      strokeLinecap="round"
                    />
                    {/* Animated dot */}
                    <circle r="3" fill="#FFD700" opacity="0.8">
                      <animateMotion
                        dur={`${3 + Math.random() * 2}s`}
                        repeatCount="indefinite"
                        path={`M ${hqLocation.x} ${hqLocation.y} Q ${midX} ${midY} ${loc.x} ${loc.y}`}
                      />
                    </circle>
                  </g>
                );
              })}
          </g>
        )}

        {/* Location markers */}
        <g>
          {projectedLocations.map((loc) => (
            <g key={loc.city} transform={`translate(${loc.x}, ${loc.y})`}>
              {loc.isHQ ? (
                <>
                  {/* Outer pulse */}
                  <circle fill="none" stroke="#FFD700" strokeWidth="1">
                    <animate attributeName="r" values="5;20;5" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Inner pulse */}
                  <circle fill="#FFD700" opacity="0.3">
                    <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Main marker */}
                  <circle r="6" fill="#FFD700" filter="url(#markerGlow)" />
                  <circle r="3" fill="#fff" />
                </>
              ) : (
                <>
                  <circle r="5" fill="#FFD700" opacity="0.8" filter="url(#markerGlow)" />
                  <circle r="2.5" fill="#fff" opacity="0.9" />
                </>
              )}
            </g>
          ))}
        </g>

        {/* City labels */}
        <g>
          {projectedLocations.map((loc) => {
            // Offset labels to avoid overlap
            const labelOffset = loc.isHQ ? 18 : 14;
            const xOffset = loc.city === "Madrid" ? -30 : loc.city === "São Paulo" ? 15 : 0;
            const yOffset = loc.city === "Medellín" ? -labelOffset : labelOffset;

            return (
              <g key={`label-${loc.city}`}>
                {/* Label background */}
                <text
                  x={loc.x + xOffset}
                  y={loc.y + yOffset}
                  textAnchor="middle"
                  fill="#000"
                  stroke="#000"
                  strokeWidth="3"
                  fontSize={loc.isHQ ? "12" : "10"}
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight={loc.isHQ ? "600" : "400"}
                >
                  {loc.city}
                </text>
                {/* Label text */}
                <text
                  x={loc.x + xOffset}
                  y={loc.y + yOffset}
                  textAnchor="middle"
                  fill={loc.isHQ ? "#FFD700" : "#999"}
                  fontSize={loc.isHQ ? "12" : "10"}
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight={loc.isHQ ? "600" : "400"}
                >
                  {loc.city}
                </text>
                {loc.isHQ && (
                  <text
                    x={loc.x}
                    y={loc.y + yOffset + 12}
                    textAnchor="middle"
                    fill="#666"
                    fontSize="9"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    HQ
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
