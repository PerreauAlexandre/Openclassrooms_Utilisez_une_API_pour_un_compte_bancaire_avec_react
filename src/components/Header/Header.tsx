import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserFirstName } from '../../app/selector'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const location = useLocation()
  const userFirstName = useSelector(getUserFirstName)

  function handleLogOut() {
    localStorage.removeItem('token')
  }

  function links() {
    switch (location.pathname) {
      case '/user':
        return (
          <>
            <Link to="/user" className="main-nav-item">
              <FontAwesomeIcon icon={faCircleUser} />
              {userFirstName}
            </Link>
            <Link to="/" className="main-nav-item" onClick={handleLogOut}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sign Out
            </Link>
          </>
        )
      default:
        return (
          <Link to="/sign-in" className="main-nav-item">
            <FontAwesomeIcon icon={faCircleUser} />
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
