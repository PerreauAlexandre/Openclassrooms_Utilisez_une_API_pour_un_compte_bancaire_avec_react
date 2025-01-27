import './EditUser.css'
import { useState } from 'react'
import { useUpdateUserMutation } from '../../services/userApi'

interface EditUserProps {
  userFirstName: string | undefined
  userLastName: string | undefined
  isEditOpen: boolean
  closeEdit: () => void
}

function EditUser({
  userFirstName,
  userLastName,
  isEditOpen,
  closeEdit,
}: EditUserProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [updateUser] = useUpdateUserMutation()

  function handleCancel() {
    closeEdit()
    setFirstName('')
    setFirstName('')
  }

  async function handleSave() {
    closeEdit()
    await updateUser({firstName, lastName})
    setFirstName('')
    setFirstName('')
  }

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
