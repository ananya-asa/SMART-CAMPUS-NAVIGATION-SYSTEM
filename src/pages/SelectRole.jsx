import { useNavigate } from 'react-router-dom'
import { ROLE_IDS, ROLES, getMapPath } from '../constants/roles'
import './SelectRole.css'

export default function SelectRole() {
  const navigate = useNavigate()

  return (
    <div className="rolePage">
      <h1 className="pageTitle">MAARGAM</h1>
      <div className="titleUnderline" />

      <p className="tagLine">Navigate Smarter, Reach Faster</p>
      <p className="description">
        Choose your role to open the interactive SJEC campus map with routes and live guidance.
      </p>

      <div className="roleContainer">
        {ROLE_IDS.map((roleId) => {
          const role = ROLES[roleId]
          return (
            <button
              key={roleId}
              type="button"
              className="roleCard"
              onClick={() => navigate(getMapPath(roleId))}
            >
              <img src={role.image} alt={role.label} className="roleImage" />
              <h2>{role.label}</h2>
            </button>
          )
        })}
      </div>
    </div>
  )
}
