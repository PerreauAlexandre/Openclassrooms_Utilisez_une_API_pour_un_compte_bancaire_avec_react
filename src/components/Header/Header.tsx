import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserFirstName, getToken } from '../../app/selector'
import { signOut } from '../../pages/SignIn/signInSlice'
import { clearUser } from '../../pages/User/userSlice'
import argentBankLogo from '../../assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const dispatch = useDispatch()
  const userFirstName = useSelector(getUserFirstName)
  const token = useSelector(getToken)

  function handleLSignOut() {
    dispatch(signOut())
    dispatch(clearUser())
  }

  function links() {
    if (token) {
      return (
        <>
          <Link to="/user" className="main-nav-item">
            <FontAwesomeIcon icon={faCircleUser} />
            {userFirstName}
          </Link>
          <Link to="/" className="main-nav-item" onClick={handleLSignOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Sign Out
          </Link>
        </>
      )
    } else {
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
