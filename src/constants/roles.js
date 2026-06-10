import studentImg from '../assets/student.png'
import facultyImg from '../assets/faculty.png'
import visitorImg from '../assets/visitor.png'
import adminImg from '../assets/admin.png'

export const ROLES = {
  student: {
    id: 'student',
    label: 'Student',
    description: 'Find classrooms, labs, and campus facilities.',
    image: studentImg,
  },
  faculty: {
    id: 'faculty',
    label: 'Faculty',
    description: 'Navigate departments and meeting spaces quickly.',
    image: facultyImg,
  },
  visitor: {
    id: 'visitor',
    label: 'Visitor',
    description: 'Explore SJEC with guided campus directions.',
    image: visitorImg,
  },
  admin: {
    id: 'admin',
    label: 'Admin',
    description: 'Oversee campus locations and key access points.',
    image: adminImg,
  },
}

export const ROLE_IDS = Object.keys(ROLES)

export function getRole(id) {
  return ROLES[id] ?? null
}

export function getMapPath(roleId) {
  return `/map/${roleId}`
}
