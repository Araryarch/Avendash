import { NavLink } from 'react-router-dom'

const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs overflow-hidden py-5 text-sm">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to={'/sensors'}>Dashboard</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Breadcrumbs
