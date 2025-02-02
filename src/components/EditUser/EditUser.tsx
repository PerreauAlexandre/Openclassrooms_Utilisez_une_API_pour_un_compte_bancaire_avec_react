import './EditUser.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useUpdateUserMutation } from '../../services/userApi'
import { updateUserNames } from '../../pages/User/userSlice'

interface EditUserProps {
  userFirstName: string | undefined
  userLastName: string | undefined
  isEditOpen: boolean
  closeEdit: () => void
  fetchUserData: () => void
}

function EditUser({
  userFirstName,
  userLastName,
  isEditOpen,
  closeEdit,
  fetchUserData,
}: EditUserProps) {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [updateUser, {isSuccess}] = useUpdateUserMutation()

  function handleCancel() {
    closeEdit()
    setFirstName('')
    setFirstName('')
  }

  async function handleSave() {
    closeEdit()
    await updateUser({firstName, lastName})
    dispatch(updateUserNames({ firstName: firstName, lastName: lastName }))
    setFirstName('')
    setFirstName('')
  }

  useEffect(() => {
      if (isSuccess) {
        fetchUserData()
      }
    }, [isSuccess, fetchUserData])

  return (
    <div className={`edit-user ${!isEditOpen ? 'hidden' : ''}`}>
      <h2 className="title">Welcome back</h2>
      <div className="inputs">
        <input
          type="text"
          placeholder={userFirstName}
          className="input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder={userLastName}
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button className="button save" onClick={handleSave}>Save</button>
        <button className="button cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default EditUser
