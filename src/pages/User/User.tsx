import { useState, useEffect, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { setUser } from './userSlice'
import { useGetUserMutation } from '../../services/userApi'
import { getUserFirstName, getUserLastName } from '../../app/selector'
import EditUser from '../../components/EditUser/EditUser'

function User() {
  const dispatch = useDispatch()
  const userFirstName = useSelector(getUserFirstName)
  const userLastName = useSelector(getUserLastName)
  const [getUser, { isLoading, isError, isSuccess, data }] =
    useGetUserMutation()

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  function openEdit() {
    setIsEditOpen(true)
  }
  function closeEdit() {
    setIsEditOpen(false)
  }

  const fetchUserData = useCallback(async () => {
    await getUser(null);
  }, [getUser]);

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.body))
    }
  }, [isSuccess, data, dispatch])

  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <Navigate to="/error" />
  ) : (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${userFirstName} ${userLastName} !`}
        </h1>
        <button
          className={`edit-button ${isEditOpen ? 'hidden' : ''}`}
          onClick={openEdit}
        >
          Edit Name
        </button>
        <EditUser
          userFirstName={userFirstName}
          userLastName={userLastName}
          isEditOpen={isEditOpen}
          closeEdit={closeEdit}
          fetchUserData={fetchUserData}
        />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default User
