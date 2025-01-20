import { Link, useLocation } from 'react-router-dom'
import argentBankLogo from "../../assets/argentBankLogo.png"

function Header() {
  const location = useLocation()

  function links() {
    switch (location.pathname) {
      case '/user':
        return (
          <>
            <Link to="/user" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Tony
            </Link>
            <Link to="/" className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        )
      default:
        return (
          <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )
    }
  }

  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>{links()}</div>
      </nav>
    </header>
  )
}

export default Header
