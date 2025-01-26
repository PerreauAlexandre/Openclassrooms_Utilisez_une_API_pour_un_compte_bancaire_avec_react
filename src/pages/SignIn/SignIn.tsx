import { useState, useEffect } from 'react'
import { useLoginMutation } from '../../services/userApi'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, isSuccess, isError, data }] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
  }

  useEffect(() => {
    if (isSuccess && data?.body?.token) {
      localStorage.setItem('token', data.body.token)
      navigate('/user')
    }
  }, [isSuccess, data?.body?.token, navigate])

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
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
            <input type="checkbox" id="remember-me" />
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
