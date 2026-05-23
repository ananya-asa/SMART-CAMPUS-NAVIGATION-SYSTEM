import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import campusData from '../../public/campus-data.json'
import { findNearestNode, isInsideCampus, startGPSTracking, stopGPSTracking, getWalkingETA, formatDistance } from '../utils/geoUtils'
import './MapView.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN_HERE'

const SJEC_CENTER = [74.8985, 12.9109]
const SJEC_BOUNDS = [[74.8968889, 12.9087629],[74.9027650, 12.9138503]]

const CAMPUS_BOUNDARY = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature', properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [74.8968889,12.9107165],[74.897765,12.9102427],[74.897921,12.9100789],
        [74.8981071,12.9100848],[74.8982991,12.9097982],[74.8984011,12.9091138],
        [74.8985451,12.9090144],[74.8991092,12.9090202],[74.8996853,12.9088798],
        [74.9005014,12.9087629],[74.9012995,12.908833],[74.9016536,12.9088623],
        [74.9017736,12.9091898],[74.9017496,12.9096812],[74.9017016,12.9100321],
        [74.9016841,12.9101175],[74.9017922,12.9102228],[74.902629,12.9107666],
        [74.902765,12.9108354],[74.9026763,12.9110126],[74.9024565,12.9112046],
        [74.9022641,12.9113492],[74.9021544,12.9113804],[74.9020168,12.9113192],
        [74.9018793,12.9112501],[74.9017879,12.9111856],[74.9016543,12.9111365],
        [74.9015163,12.9110949],[74.9014047,12.9110554],[74.9012899,12.9110147],
        [74.9011949,12.9110695],[74.9011265,12.9111879],[74.9010454,12.9113645],
        [74.9009599,12.9114714],[74.9008482,12.9116965],[74.9007766,12.9119113],
        [74.9006573,12.9120389],[74.9006301,12.9121339],[74.9005207,12.9123609],
        [74.9003934,12.9126228],[74.9002184,12.9128189],[74.9001476,12.9131706],
        [74.8997958,12.9133996],[74.8995096,12.9135943],[74.8991427,12.9137861],
        [74.8990931,12.9138503],[74.8986246,12.9133646],[74.898469,12.9132113],
        [74.8986018,12.913097],[74.8987483,12.9129899],[74.8989468,12.912883],
        [74.899108,12.9127739],[74.8991402,12.9126306],[74.8990791,12.9124929],
        [74.8989107,12.9122794],[74.8988392,12.9121799],[74.8987819,12.9121276],
        [74.8984901,12.9122471],[74.8982701,12.9123287],[74.8980626,12.9123971],
        [74.8979217,12.9124508],[74.8976934,12.9120423],[74.8975627,12.9117554],
        [74.897339,12.9114007],[74.8972031,12.9111352],[74.897074,12.9109405],
        [74.8969099,12.91073],[74.8968889,12.9107165],
      ]]
    }
  }]
}

const OUTSIDE_MASK = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature', properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [[-180,-90],[180,-90],[180,90],[-180,90],[-180,-90]],
        [
          [74.8968889,12.9107165],[74.8969099,12.91073],[74.897074,12.9109405],
          [74.8972031,12.9111352],[74.897339,12.9114007],[74.8975627,12.9117554],
          [74.8976934,12.9120423],[74.8979217,12.9124508],[74.8980626,12.9123971],
          [74.8982701,12.9123287],[74.8984901,12.9122471],[74.8987819,12.9121276],
          [74.8988392,12.9121799],[74.8989107,12.9122794],[74.8990791,12.9124929],
          [74.8991402,12.9126306],[74.899108,12.9127739],[74.8989468,12.912883],
          [74.8987483,12.9129899],[74.8986018,12.913097],[74.898469,12.9132113],
          [74.8986246,12.9133646],[74.8990931,12.9138503],[74.8991427,12.9137861],
          [74.8995096,12.9135943],[74.8997958,12.9133996],[74.9001476,12.9131706],
          [74.9002184,12.9128189],[74.9003934,12.9126228],[74.9005207,12.9123609],
          [74.9006301,12.9121339],[74.9006573,12.9120389],[74.9007766,12.9119113],
          [74.9008482,12.9116965],[74.9009599,12.9114714],[74.9010454,12.9113645],
          [74.9011265,12.9111879],[74.9011949,12.9110695],[74.9012899,12.9110147],
          [74.9014047,12.9110554],[74.9015163,12.9110949],[74.9016543,12.9111365],
          [74.9017879,12.9111856],[74.9018793,12.9112501],[74.9020168,12.9113192],
          [74.9021544,12.9113804],[74.9022641,12.9113492],[74.9024565,12.9112046],
          [74.9026763,12.9110126],[74.902765,12.9108354],[74.902629,12.9107666],
          [74.9017922,12.9102228],[74.9016841,12.9101175],[74.9017016,12.9100321],
          [74.9017496,12.9096812],[74.9017736,12.9091898],[74.9016536,12.9088623],
          [74.9012995,12.908833],[74.9005014,12.9087629],[74.8996853,12.9088798],
          [74.8991092,12.9090202],[74.8985451,12.9090144],[74.8984011,12.9091138],
          [74.8982991,12.9097982],[74.8981071,12.9100848],[74.897921,12.9100789],
          [74.897765,12.9102427],[74.8968889,12.9107165],
        ]
      ]
    }
  }]
}

const TYPE_CONFIG = {
  gate:     { color: '#ff4d6d', glow: 'rgba(255,77,109,0.4)',  bg: 'rgba(255,77,109,0.12)',  emoji: '🚪', label: 'Gate'     },
  admin:    { color: '#fbbf24', glow: 'rgba(251,191,36,0.4)',  bg: 'rgba(251,191,36,0.12)',  emoji: '🏛',  label: 'Admin'    },
  academic: { color: '#60a5fa', glow: 'rgba(96,165,250,0.4)',  bg: 'rgba(96,165,250,0.12)',  emoji: '🎓', label: 'Academic' },
  parking:  { color: '#94a3b8', glow: 'rgba(148,163,184,0.4)', bg: 'rgba(148,163,184,0.12)', emoji: '🅿',  label: 'Parking'  },
  amenity:  { color: '#34d399', glow: 'rgba(52,211,153,0.4)',  bg: 'rgba(52,211,153,0.12)',  emoji: '🍽',  label: 'Amenity'  },
  landmark: { color: '#c084fc', glow: 'rgba(192,132,252,0.4)', bg: 'rgba(192,132,252,0.12)', emoji: '📍', label: 'Landmark' },
  sports:   { color: '#22d3ee', glow: 'rgba(34,211,238,0.4)',  bg: 'rgba(34,211,238,0.12)',  emoji: '🏀', label: 'Sports'   },
}

function dijkstra(nodes, edges, startId, endId) {
  const dist = {}, prev = {}
  const visited = new Set()
  nodes.forEach(n => { dist[n.id] = Infinity; prev[n.id] = null })
  dist[startId] = 0
  const adj = {}
  nodes.forEach(n => { adj[n.id] = [] })
  edges.forEach(e => {
    if (adj[e.from]) adj[e.from].push({ id: e.to,   weight: e.weight })
    if (adj[e.to])   adj[e.to].push({   id: e.from, weight: e.weight })
  })
  while (true) {
    let u = null
    nodes.forEach(n => { if (!visited.has(n.id) && (u === null || dist[n.id] < dist[u])) u = n.id })
    if (!u || dist[u] === Infinity || u === endId) break
    visited.add(u)
    ;(adj[u] || []).forEach(({ id: v, weight }) => {
      const alt = dist[u] + weight
      if (alt < dist[v]) { dist[v] = alt; prev[v] = u }
    })
  }
  const path = []
  let cur = endId
  while (cur) { path.unshift(cur); cur = prev[cur] }
  return path[0] === startId ? { path, distance: dist[endId] } : null
}

function buildNodesGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: campusData.nodes.map(n => ({
      type: 'Feature',
      properties: { ...n },
      geometry: { type: 'Point', coordinates: [n.lng, n.lat] }
    }))
  }
}

function buildEdgesGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: campusData.edges.map(e => {
      const from = campusData.nodes.find(n => n.id === e.from)
      const to   = campusData.nodes.find(n => n.id === e.to)
      if (!from || !to) return null
      return {
        type: 'Feature',
        properties: { weight: e.weight },
        geometry: { type: 'LineString', coordinates: [[from.lng, from.lat], [to.lng, to.lat]] }
      }
    }).filter(Boolean)
  }
}

export default function MapView() {
  const mapContainer = useRef(null)
  const mapRef       = useRef(null)
  const watchIdRef   = useRef(null)
  const userMarkerRef = useRef(null)

  const [selectedNode,  setSelectedNode]  = useState(null)
  const [routeFrom,     setRouteFrom]     = useState('')
  const [routeTo,       setRouteTo]       = useState('')
  const [routeResult,   setRouteResult]   = useState(null)
  const [searchQuery,   setSearchQuery]   = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [routeMode,     setRouteMode]     = useState(false)
  const [mapLoaded,     setMapLoaded]     = useState(false)
  const [is3D,          setIs3D]          = useState(true)
  const [liveTracking,  setLiveTracking]  = useState(false)
  const [gpsStatus,     setGpsStatus]     = useState('') // 'inside' | 'outside' | 'error'
  const [nearestNode,   setNearestNode]   = useState(null)

  useEffect(() => {
    if (mapRef.current) return

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style:     'mapbox://styles/mapbox/dark-v11',
      center:    SJEC_CENTER,
      zoom:      16.8,
      minZoom:   15.5,
      maxZoom:   20,
      maxBounds: SJEC_BOUNDS,
      pitch:     52,
      bearing:   -15,
      antialias: true,
    })

    mapRef.current = map
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-right')

    map.on('load', () => {
      // 3D buildings
      map.addLayer({
        id: 'osm-3d', type: 'fill-extrusion',
        source: 'composite', 'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        paint: {
          'fill-extrusion-color':   '#0d1829',
          'fill-extrusion-height':  ['interpolate',['linear'],['zoom'],15,0,15.05,['get','height']],
          'fill-extrusion-base':    ['interpolate',['linear'],['zoom'],15,0,15.05,['get','min_height']],
          'fill-extrusion-opacity': 0.8,
        }
      })

      // Outside mask
      map.addSource('outside-mask', { type: 'geojson', data: OUTSIDE_MASK })
      map.addLayer({
        id: 'outside-mask-layer', type: 'fill', source: 'outside-mask',
        paint: { 'fill-color': '#020812', 'fill-opacity': 0.88 }
      })

      // Campus boundary
      map.addSource('campus-boundary', { type: 'geojson', data: CAMPUS_BOUNDARY })
      map.addLayer({
        id: 'campus-boundary-glow', type: 'line', source: 'campus-boundary',
        paint: { 'line-color': '#1d4ed8', 'line-width': 2, 'line-opacity': 0.5, 'line-blur': 2 }
      })

      // Edges
      map.addSource('edges', { type: 'geojson', data: buildEdgesGeoJSON() })
      map.addLayer({
        id: 'edges-glow', type: 'line', source: 'edges',
        paint: { 'line-color': '#1e40af', 'line-width': 8, 'line-opacity': 0.15, 'line-blur': 6 }
      })
      map.addLayer({
        id: 'edges-line', type: 'line', source: 'edges',
        paint: { 'line-color': '#1d4ed8', 'line-width': 1.5, 'line-opacity': 0.5, 'line-dasharray': [4,3] }
      })

      // Route
      map.addSource('route', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
      map.addLayer({
        id: 'route-glow', type: 'line', source: 'route',
        paint: { 'line-color': '#38bdf8', 'line-width': 18, 'line-opacity': 0.12, 'line-blur': 8 }
      })
      map.addLayer({
        id: 'route-outer', type: 'line', source: 'route',
        paint: { 'line-color': '#0ea5e9', 'line-width': 5, 'line-opacity': 0.4 }
      })
      map.addLayer({
        id: 'route-core', type: 'line', source: 'route',
        paint: { 'line-color': '#38bdf8', 'line-width': 2.5, 'line-opacity': 1 }
      })

      // Nodes
      map.addSource('nodes', { type: 'geojson', data: buildNodesGeoJSON() })
      map.addLayer({
        id: 'nodes-glow', type: 'circle', source: 'nodes',
        paint: {
          'circle-radius': 20,
          'circle-color': ['match',['get','type'],
            'gate','#ff4d6d','admin','#fbbf24','academic','#60a5fa',
            'parking','#94a3b8','amenity','#34d399','landmark','#c084fc','sports','#22d3ee','#60a5fa'
          ],
          'circle-opacity': 0.08, 'circle-blur': 1,
        }
      })
      map.addLayer({
        id: 'nodes-bg', type: 'circle', source: 'nodes',
        paint: {
          'circle-radius': 13,
          'circle-color': ['match',['get','type'],
            'gate','rgba(255,77,109,0.15)','admin','rgba(251,191,36,0.15)',
            'academic','rgba(96,165,250,0.15)','parking','rgba(148,163,184,0.15)',
            'amenity','rgba(52,211,153,0.15)','landmark','rgba(192,132,252,0.15)',
            'sports','rgba(34,211,238,0.15)','rgba(96,165,250,0.15)'
          ],
          'circle-stroke-color': ['match',['get','type'],
            'gate','#ff4d6d','admin','#fbbf24','academic','#60a5fa',
            'parking','#94a3b8','amenity','#34d399','landmark','#c084fc','sports','#22d3ee','#60a5fa'
          ],
          'circle-stroke-width': 1.5, 'circle-stroke-opacity': 0.7, 'circle-opacity': 1,
        }
      })
      map.addLayer({
        id: 'nodes-label', type: 'symbol', source: 'nodes',
        layout: {
          'text-field': ['get','label'],
          'text-font':  ['DIN Offc Pro Medium','Arial Unicode MS Bold'],
          'text-size':  10.5, 'text-offset': [0,2.0], 'text-anchor': 'top',
          'text-max-width': 8, 'text-allow-overlap': false, 'icon-allow-overlap': true,
        },
        paint: { 'text-color': '#cbd5e1', 'text-halo-color': '#020812', 'text-halo-width': 2, 'text-opacity': 0.9 }
      })

      map.on('click', 'nodes-bg', (e) => { setSelectedNode(e.features[0].properties); setRouteMode(false) })
      map.on('mouseenter', 'nodes-bg', () => map.getCanvas().style.cursor = 'pointer')
      map.on('mouseleave', 'nodes-bg', () => map.getCanvas().style.cursor = '')

      setMapLoaded(true)
    })

    return () => { map.remove(); mapRef.current = null }
  }, [])

  // ── GPS location handler ────────────────────────────────────────
  const handleLocationUpdate = useCallback((location) => {
    const map = mapRef.current
    if (!map) return

    const inside = isInsideCampus(
      location.lat, location.lng,
      CAMPUS_BOUNDARY.features[0].geometry.coordinates
    )
    setGpsStatus(inside ? 'inside' : 'outside')

    // Update or create user marker
    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([location.lng, location.lat])
    } else {
      const el = document.createElement('div')
      el.style.cssText = `
        width:18px;height:18px;
        background:#38bdf8;
        border:3px solid #fff;
        border-radius:50%;
        box-shadow:0 0 12px rgba(56,189,248,0.6);
      `
      userMarkerRef.current = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .addTo(map)
    }

    if (inside) {
      const { node } = findNearestNode(location.lat, location.lng, campusData.nodes)
      if (node) {
        setNearestNode(node)
        setRouteFrom(node.id) // auto set From
      }
    }
  }, [])

  // ── Toggle live tracking ────────────────────────────────────────
  const toggleLiveTracking = useCallback(() => {
    if (liveTracking) {
      stopGPSTracking(watchIdRef.current)
      watchIdRef.current = null
      setLiveTracking(false)
      setGpsStatus('')
      setNearestNode(null)
      if (userMarkerRef.current) {
        userMarkerRef.current.remove()
        userMarkerRef.current = null
      }
    } else {
      const id = startGPSTracking(
        handleLocationUpdate,
        (err) => { console.error(err); setGpsStatus('error') }
      )
      watchIdRef.current = id
      setLiveTracking(true)
    }
  }, [liveTracking, handleLocationUpdate])

  // Cleanup on unmount
  useEffect(() => {
    return () => { stopGPSTracking(watchIdRef.current) }
  }, [])

  const drawRoute = useCallback((path) => {
    const map = mapRef.current
    if (!map?.getSource('route')) return
    const coords = path.map(id => {
      const n = campusData.nodes.find(x => x.id === id)
      return [n.lng, n.lat]
    })
    map.getSource('route').setData({
      type: 'FeatureCollection',
      features: [{ type: 'Feature', geometry: { type: 'LineString', coordinates: coords } }]
    })
    const bounds = coords.reduce(
      (b, c) => b.extend(c), new mapboxgl.LngLatBounds(coords[0], coords[0])
    )
    map.fitBounds(bounds, { padding: 100, pitch: 52, bearing: -15, duration: 1400 })
  }, [])

  const clearRoute = useCallback(() => {
    mapRef.current?.getSource('route')?.setData({ type: 'FeatureCollection', features: [] })
    setRouteFrom(''); setRouteTo(''); setRouteResult(null)
  }, [])

  useEffect(() => {
    if (!routeFrom || !routeTo) return
    const result = dijkstra(campusData.nodes, campusData.edges, routeFrom, routeTo)
    setRouteResult(result)
    if (result) drawRoute(result.path)
  }, [routeFrom, routeTo, drawRoute])

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return }
    const q = searchQuery.toLowerCase()
    setSearchResults(campusData.nodes.filter(n => n.label.toLowerCase().includes(q)).slice(0, 5))
  }, [searchQuery])

  const flyToNode = (node) => {
    mapRef.current?.flyTo({ center: [node.lng, node.lat], zoom: 18.5, pitch: 55, duration: 1000 })
    setSelectedNode(node); setSearchQuery(''); setSearchResults([]); setRouteMode(false)
  }

  const toggle3D = () => {
    const next = !is3D
    mapRef.current?.easeTo({ pitch: next ? 52 : 0, bearing: next ? -15 : 0, duration: 700 })
    setIs3D(next)
  }

  const resetView = () => {
    mapRef.current?.flyTo({ center: SJEC_CENTER, zoom: 16.8, pitch: 52, bearing: -15, duration: 1200 })
  }

  const openRouteFrom = (node) => { setRouteMode(true); setRouteFrom(node.id); setSelectedNode(null) }

  return (
    <div className="sjec-root">
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

      {/* Header */}
      <div className="sjec-header">
        <div className="sjec-logo">🎓</div>
        <div className="sjec-title">
          <h1>SJEC Campus Nav</h1>
          <p>St Joseph Engineering College · Vamanjoor</p>
        </div>
        <div className="sjec-search-wrap">
          <span className="sjec-search-icon">🔍</span>
          <input className="sjec-search" value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search any place on campus..." />
          {searchResults.length > 0 && (
            <div className="sjec-search-results">
              {searchResults.map(n => (
                <div key={n.id} className="sjec-search-item" onClick={() => flyToNode(n)}>
                  <div className="sjec-search-dot" style={{ background: TYPE_CONFIG[n.type]?.color }} />
                  {n.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="sjec-controls">
        <button className={`sjec-btn ${is3D ? 'active' : ''}`} onClick={toggle3D}>
          <span>{is3D ? '🏢' : '🗺'}</span><span>{is3D ? '3D' : '2D'}</span>
        </button>
        <button className="sjec-btn" onClick={resetView}>
          <span>🎯</span><span>Reset</span>
        </button>
        <button className={`sjec-btn ${routeMode ? 'active danger' : ''}`}
          onClick={() => { setRouteMode(!routeMode); setSelectedNode(null); if (routeMode) clearRoute() }}>
          <span>{routeMode ? '✕' : '🧭'}</span><span>{routeMode ? 'Cancel' : 'Route'}</span>
        </button>
        {/* Live Tracking Button */}
        <button className={`sjec-btn ${liveTracking ? 'active' : ''}`} onClick={toggleLiveTracking}>
          <span>{liveTracking ? '📡' : '📍'}</span>
          <span>{liveTracking ? 'Tracking' : 'Live Track'}</span>
        </button>
      </div>

      {/* GPS Status Bar */}
      {liveTracking && (
        <div className="sjec-gps-bar" style={{
          position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          background: gpsStatus === 'inside' ? 'rgba(52,211,153,0.15)' : 'rgba(255,77,109,0.15)',
          border: `1px solid ${gpsStatus === 'inside' ? '#34d399' : '#ff4d6d'}`,
          borderRadius: 20, padding: '6px 16px', fontSize: 12,
          color: gpsStatus === 'inside' ? '#34d399' : '#ff4d6d',
          backdropFilter: 'blur(8px)', zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <span style={{ animation: 'pulse 1.5s infinite' }}>●</span>
          {gpsStatus === 'inside'
            ? `📍 Near: ${nearestNode?.label || '...'}`
            : gpsStatus === 'outside'
            ? '⚠ You are outside campus'
            : '🔍 Getting GPS...'}
        </div>
      )}

      {/* Legend */}
      <div className="sjec-legend">
        <div className="sjec-legend-title">Legend</div>
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
          <div key={type} className="sjec-legend-item">
            <div className="sjec-legend-dot" style={{ background: cfg.color }} />{cfg.label}
          </div>
        ))}
      </div>

      {/* Node Info Panel */}
      {selectedNode && !routeMode && (
        <div className="sjec-panel">
          <button className="sjec-close" onClick={() => setSelectedNode(null)}>✕</button>
          <div className="sjec-info-header">
            <div className="sjec-info-icon" style={{
              background: TYPE_CONFIG[selectedNode.type]?.bg,
              border:     `1px solid ${TYPE_CONFIG[selectedNode.type]?.color}30`,
              boxShadow:  `0 0 16px ${TYPE_CONFIG[selectedNode.type]?.glow}`,
            }}>
              {TYPE_CONFIG[selectedNode.type]?.emoji}
            </div>
            <div>
              <div className="sjec-info-name">{selectedNode.label}</div>
              <div className="sjec-info-type" style={{ color: TYPE_CONFIG[selectedNode.type]?.color }}>
                {TYPE_CONFIG[selectedNode.type]?.label}
              </div>
            </div>
          </div>
          <div className="sjec-info-coords">
            📌 {Number(selectedNode.lat).toFixed(6)}, {Number(selectedNode.lng).toFixed(6)}
          </div>
          <button className="sjec-nav-btn" onClick={() => openRouteFrom(selectedNode)}>
            <span>🧭</span> Navigate from here
          </button>
        </div>
      )}

      {/* Route Panel */}
      {routeMode && (
        <div className="sjec-panel">
          <div className="sjec-route-title"><span>🧭</span> Route Planner</div>

          {/* GPS auto-from indicator */}
          {liveTracking && nearestNode && (
            <div style={{
              fontSize: 11, color: '#34d399', background: 'rgba(52,211,153,0.1)',
              borderRadius: 8, padding: '4px 8px', marginBottom: 8
            }}>
              📡 Auto: Starting from {nearestNode.label}
            </div>
          )}

          <div className="sjec-route-selects">
            <select className="sjec-select" value={routeFrom} onChange={e => setRouteFrom(e.target.value)}>
              <option value="">📍 From...</option>
              {campusData.nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
            </select>
            <span className="sjec-arrow">→</span>
            <select className="sjec-select" value={routeTo} onChange={e => setRouteTo(e.target.value)}>
              <option value="">🏁 To...</option>
              {campusData.nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
            </select>
          </div>

          {routeResult && (
            <div className="sjec-route-result">
              <div className="sjec-route-stats">
                <div className="sjec-stat">
                  <div className="sjec-stat-val">{formatDistance(routeResult.distance)}</div>
                  <div className="sjec-stat-label">Distance</div>
                </div>
                <div className="sjec-stat">
                  <div className="sjec-stat-val">{routeResult.path.length - 1}</div>
                  <div className="sjec-stat-label">Stops</div>
                </div>
                <div className="sjec-stat">
                  <div className="sjec-stat-val">{getWalkingETA(routeResult.distance)}</div>
                  <div className="sjec-stat-label">Walk time</div>
                </div>
              </div>
              <div className="sjec-route-path">
                {routeResult.path.map((id, i) => {
                  const n = campusData.nodes.find(x => x.id === id)
                  return (
                    <span key={id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {i > 0 && <span className="sjec-path-arrow">›</span>}
                      <span className="sjec-path-node">{n?.label}</span>
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {routeFrom && routeTo && !routeResult && (
            <div className="sjec-no-route">⚠ No path found between these locations</div>
          )}
          <button className="sjec-clear-btn" onClick={clearRoute}>Clear Route</button>
        </div>
      )}

      {/* Loading */}
      {!mapLoaded && (
        <div className="sjec-loading">
          <div className="sjec-loading-logo">🎓</div>
          <h2>SJEC Campus Nav</h2>
          <p>Initializing campus map...</p>
        </div>
      )}
    </div>
  )
}