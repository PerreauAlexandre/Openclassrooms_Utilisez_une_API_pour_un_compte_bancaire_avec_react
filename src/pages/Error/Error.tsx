import { Link } from "react-router-dom"
import './Error.css'

function Error () {
    return (
        <div id="error-page">
          <h1 className="error-title">404</h1>
          <p className="error-text">
            Oups! La page que vous demandez n'existe pas.
          </p>
          <Link to="/" className="link">
            Retourner sur la page d'accueil
          </Link>
        </div>
      )
}

export default Error