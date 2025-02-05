import { useState, useEffect } from 'react'
import { useLoginMutation } from '../../services/userApi'
import { useSelector, useDispatch } from 'react-redux'
import { setRememberMe, setToken } from './signInSlice'
import { getRememberMe } from '../../app/selector'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rememberMe = useSelector(getRememberMe)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [login, { isLoading, isSuccess, isError, data }] = useLoginMutation()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await login({ email, password })
  }

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setToken(data.body.token))
      navigate('/user')
    }
  }, [isSuccess, data, navigate, dispatch])

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => dispatch(setRememberMe(e.target.checked))}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
          {isError && <p className="sign-in-fail">Failed to log in</p>}
        </form>
      </section>
    </main>
  )
}

export default SignIn
