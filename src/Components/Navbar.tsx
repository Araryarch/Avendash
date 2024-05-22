import { NavLink } from 'react-router-dom'

interface NavbarProps {
  addClass?: string
}

const Navbar = ({ addClass }: NavbarProps) => {
  return (
    <nav className={`${addClass} navbar-container navbar mx-auto my-5`}>
      <div className="navbar rounded-box bg-base-100 shadow-sm shadow-primary">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li>
                <NavLink to={'/sensors'}>Dashboard</NavLink>
              </li>
              <li>
                <select
                  className="select select-bordered my-2 w-full max-w-xs"
                  onChange={(e) => {
                    document.documentElement.setAttribute(
                      'data-theme',
                      e.target.value,
                    )
                  }}
                >
                  <option disabled selected>
                    Theme
                  </option>
                  <option value="retro">Retro</option>
                  <option value="cyberpunk">Cyberpunk</option>
                  <option value="valentine">Valentine</option>
                  <option value="coffee">Coffee</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <NavLink to={'/'} className="btn btn-ghost text-xl">
            Avendash
          </NavLink>
        </div>
        <div className="navbar-end">
          <img src="img/logo.png" alt="" width={50} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
