import { Navigate, useParams } from 'react-router-dom'
import MapView from '../components/MapView'
import { getRole } from '../constants/roles'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapPage() {
  const { role } = useParams()
  const roleConfig = getRole(role)

  if (!roleConfig) {
    return <Navigate to="/select" replace />
  }

  return (
    <div className="map-page">
      <MapView userRole={roleConfig.id} roleLabel={roleConfig.label} />
    </div>
  )
}
