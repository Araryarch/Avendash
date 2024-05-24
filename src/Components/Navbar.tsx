import { NavLink } from 'react-router-dom'

interface NavbarProps {
  addClass?: string
}

const Navbar = ({ addClass }: NavbarProps) => {
  return (
    <nav className={`${addClass} navbar-container navbar mx-auto my-5`}>
      <div className="shadow-sm navbar rounded-box bg-base-100 shadow-primary">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
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
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <NavLink to={'/'} className="text-xl btn btn-ghost">
            Avendash
          </NavLink>
        </div>
        <div className="navbar-end">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="m-1 btn">
              Theme
              <svg
                width="12px"
                height="12px"
                className="inline-block w-2 h-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl"
            >
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="Default"
                  value="default"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="Retro"
                  value="retro"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="Cyberpunk"
                  value="cyberpunk"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="Valentine"
                  value="valentine"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="wireframe"
                  value="wireframe"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="autumn"
                  value="autumn"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="black"
                  value="black"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="luxury"
                  value="luxury"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="coffee"
                  value="coffee"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="nord"
                  value="nord"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="pastel"
                  value="pastel"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="cupcake"
                  value="cupcake"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="justify-start theme-controller btn btn-ghost btn-sm btn-block"
                  aria-label="halloween"
                  value="halloween"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
