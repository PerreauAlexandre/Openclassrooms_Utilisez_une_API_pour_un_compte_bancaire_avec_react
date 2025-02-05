import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { store, persistor } from './app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './main.css'
import Header from './components/Header/Header.tsx'
import Footer from './components/Footer/Footer.tsx'
import Home from './pages/Home/Home.tsx'
import SignIn from './pages/SignIn/SignIn.tsx'
import User from './pages/User/User.tsx'
import Error from './pages/Error/Error.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<User />} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Navigate to="/error" replace={true} />} />
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
)
