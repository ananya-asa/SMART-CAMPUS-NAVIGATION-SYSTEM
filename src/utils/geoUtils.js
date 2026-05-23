// utils/geoUtils.js

// ── Haversine distance (metres) ───────────────────────────────────
export function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Point in polygon (ray casting) ───────────────────────────────
export function pointInPolygon(lng, lat, polygon) {
  const pts = polygon[0];
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}

// ── Dijkstra's shortest path ──────────────────────────────────────
export function dijkstra(nodes, edges, startId, endId) {
  const dist = {}, prev = {};
  const visited = new Set();
  nodes.forEach((n) => { dist[n.id] = Infinity; prev[n.id] = null; });
  dist[startId] = 0;

  const adj = {};
  nodes.forEach((n) => { adj[n.id] = []; });
  edges.forEach((e) => {
    if (adj[e.from]) adj[e.from].push({ id: e.to,   weight: e.weight });
    if (adj[e.to])   adj[e.to].push({   id: e.from, weight: e.weight });
  });

  while (true) {
    let u = null;
    nodes.forEach((n) => {
      if (!visited.has(n.id) && (u === null || dist[n.id] < dist[u])) u = n.id;
    });
    if (!u || dist[u] === Infinity || u === endId) break;
    visited.add(u);
    (adj[u] || []).forEach(({ id: v, weight }) => {
      const alt = dist[u] + weight;
      if (alt < dist[v]) { dist[v] = alt; prev[v] = u; }
    });
  }

  const path = [];
  let cur = endId;
  while (cur) { path.unshift(cur); cur = prev[cur]; }
  return path[0] === startId ? { path, distance: dist[endId] } : null;
}

// ── Find nearest campus node to user position ─────────────────────
export function findNearestNode(userLat, userLng, nodes) {
  let nearest = null;
  let minDist = Infinity;

  nodes.forEach(node => {
    const d = haversine(userLat, userLng, node.lat, node.lng);
    if (d < minDist) { minDist = d; nearest = node; }
  });

  return { node: nearest, distance: Math.round(minDist) };
}

// ── Check if user is inside campus boundary ───────────────────────
export function isInsideCampus(userLat, userLng, campusBoundary) {
  return pointInPolygon(userLng, userLat, campusBoundary);
}

// ── Start watching GPS position continuously ──────────────────────
export function startGPSTracking(onLocation, onError) {
  if (!navigator.geolocation) {
    onError('GPS not supported on this device');
    return null;
  }

  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      onLocation({
        lat:      pos.coords.latitude,
        lng:      pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        heading:  pos.coords.heading,
        speed:    pos.coords.speed,
      });
    },
    (err) => onError(err.message),
    { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
  );

  return watchId;
}

// ── Stop GPS tracking ─────────────────────────────────────────────
export function stopGPSTracking(watchId) {
  if (watchId !== null && watchId !== undefined) {
    navigator.geolocation.clearWatch(watchId);
  }
}

// ── Get user position once (no continuous tracking) ───────────────
export function getUserPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('GPS not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat:      pos.coords.latitude,
        lng:      pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      }),
      (err) => reject(err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

// ── Calculate walking ETA (80m per minute average) ───────────────
export function getWalkingETA(distanceMetres) {
  const minutes = Math.ceil(distanceMetres / 80);
  if (minutes < 1) return 'Less than 1 min';
  if (minutes === 1) return '1 min';
  return `${minutes} mins`;
}

// ── Format distance for display ───────────────────────────────────
export function formatDistance(metres) {
  if (metres < 1000) return `${Math.round(metres)}m`;
  return `${(metres / 1000).toFixed(1)}km`;
}