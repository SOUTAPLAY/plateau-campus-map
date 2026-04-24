'use client';

import { useEffect, useRef, useState } from 'react';
import { Layers, Navigation, ZoomIn, ZoomOut } from 'lucide-react';

// Meisei University (明星大学), Hino City coordinates
const MEISEI_CENTER: [number, number] = [139.3755, 35.6494];
const DEFAULT_ZOOM = 16;
const DEFAULT_PITCH = 55;
const DEFAULT_BEARING = -15;

// PLATEAU building MVT tile URL for Hino City (日野市, city code: 13207)
// Source: G空間情報センター / Project PLATEAU 2022
// https://www.geospatial.jp/ckan/dataset/plateau-13207-hino-shi-2022
const PLATEAU_BLDG_TILE_URL =
  process.env.NEXT_PUBLIC_PLATEAU_TILE_URL ??
  'https://assets.cms.plateau.reearth.io/assets/6f79bdc3-4623-4a28-9ac1-f0a5a9dd3c96/bldg/{z}/{x}/{y}.pbf';

export default function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('maplibre-gl').Map | null>(null);
  const [is3D, setIs3D] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let map: import('maplibre-gl').Map;

    // Dynamically import maplibre-gl to avoid SSR issues
    import('maplibre-gl').then(({ Map, NavigationControl }) => {
      map = new Map({
        container: containerRef.current!,
        style: {
          version: 8,
          glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
          sources: {
            // GSI vector tiles (国土地理院) as base map
            gsi: {
              type: 'raster',
              tiles: [
                'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
              ],
              tileSize: 256,
              attribution:
                '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>',
              maxzoom: 18,
            },
            // PLATEAU building tiles (Project PLATEAU 2022, Hino City)
            plateau_bldg: {
              type: 'vector',
              tiles: [PLATEAU_BLDG_TILE_URL],
              minzoom: 12,
              maxzoom: 18,
              attribution:
                '<a href="https://www.mlit.go.jp/plateau/" target="_blank">国土交通省 Project PLATEAU</a>',
            },
            // Fallback OSM building data
            osm_bldg: {
              type: 'vector',
              tiles: ['https://tile.openstreetmap.jp/data/japan/{z}/{x}/{y}.pbf'],
              minzoom: 13,
              maxzoom: 16,
              attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
            },
          },
          layers: [
            // Base raster layer
            {
              id: 'gsi-base',
              type: 'raster',
              source: 'gsi',
              paint: { 'raster-opacity': 1 },
            },
            // PLATEAU building footprints (fill)
            {
              id: 'plateau-bldg-fill',
              type: 'fill-extrusion',
              source: 'plateau_bldg',
              'source-layer': 'bldg',
              minzoom: 13,
              paint: {
                'fill-extrusion-color': [
                  'interpolate',
                  ['linear'],
                  ['coalesce', ['get', 'measuredHeight'], 10],
                  0, '#C7D2FE',
                  10, '#818CF8',
                  30, '#4F46E5',
                  60, '#1E1B4B',
                ],
                'fill-extrusion-height': [
                  'coalesce',
                  ['get', 'measuredHeight'],
                  10,
                ],
                'fill-extrusion-base': 0,
                'fill-extrusion-opacity': 0.85,
              },
            },
            // OSM building fallback (fill-extrusion)
            {
              id: 'osm-bldg-fill',
              type: 'fill-extrusion',
              source: 'osm_bldg',
              'source-layer': 'building',
              minzoom: 14,
              paint: {
                'fill-extrusion-color': '#A5B4FC',
                'fill-extrusion-height': [
                  'coalesce',
                  ['get', 'render_height'],
                  8,
                ],
                'fill-extrusion-base': 0,
                'fill-extrusion-opacity': 0.6,
              },
            },
          ],
        },
        center: MEISEI_CENTER,
        zoom: DEFAULT_ZOOM,
        pitch: DEFAULT_PITCH,
        bearing: DEFAULT_BEARING,
        maxZoom: 20,
        minZoom: 10,
        antialias: true,
      });

      // Add navigation control
      map.addControl(
        new NavigationControl({ showCompass: true, showZoom: false }),
        'top-right'
      );

      map.on('load', () => {
        setMapLoaded(true);
      });

      mapRef.current = map;
    });

    return () => {
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  const toggle3D = () => {
    const m = mapRef.current;
    if (!m) return;
    if (is3D) {
      m.easeTo({ pitch: 0, bearing: 0, duration: 500 });
    } else {
      m.easeTo({ pitch: DEFAULT_PITCH, bearing: DEFAULT_BEARING, duration: 500 });
    }
    setIs3D(!is3D);
  };

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();
  const resetNorth = () => {
    mapRef.current?.easeTo({
      center: MEISEI_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: DEFAULT_PITCH,
      bearing: DEFAULT_BEARING,
      duration: 800,
    });
  };

  return (
    <div className="relative w-full h-full">
      {/* Map container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm opacity-75">3Dマップを読み込み中...</p>
          </div>
        </div>
      )}

      {/* Map info badge */}
      {mapLoaded && (
        <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white rounded-xl px-3 py-2 text-xs leading-relaxed">
          <p className="font-semibold">明星大学</p>
          <p className="opacity-70 text-[10px]">Project PLATEAU — 日野市</p>
        </div>
      )}

      {/* Custom controls */}
      <div className="absolute right-3 bottom-4 z-10 flex flex-col gap-2">
        {/* 3D toggle */}
        <button
          onClick={toggle3D}
          className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform"
          title={is3D ? '2D表示に切替' : '3D表示に切替'}
        >
          <Layers size={18} className="text-blue-500" />
        </button>
        {/* Zoom In */}
        <button
          onClick={zoomIn}
          className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform"
        >
          <ZoomIn size={18} />
        </button>
        {/* Zoom Out */}
        <button
          onClick={zoomOut}
          className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform"
        >
          <ZoomOut size={18} />
        </button>
        {/* Reset to campus */}
        <button
          onClick={resetNorth}
          className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform"
          title="キャンパスに戻る"
        >
          <Navigation size={18} className="text-blue-500" />
        </button>
      </div>
    </div>
  );
}
