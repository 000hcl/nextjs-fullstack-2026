"use client"
import { registerUser } from "../actions/users"
import { useActionState } from "react"

const RegisterPage = () => {
  const initialState = { 
    errors: {
      username: '',
      name: '',
      password: '',
      passwordConfirm: ''
    }, 
    values: {
      username: '',
      name: '',
      password: '',
      passwordConfirm: ''
  }}
  const [state, formAction] = useActionState(registerUser, initialState)
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" defaultValue={state.values?.username} required />
          </label>
          <div>
            {state.errors.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
          </div>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values?.name} required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" defaultValue={state.values?.password} required />
          </label>
          <div>
            {state.errors.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
          </div>
        </div>
        <div>
          <label>
            Confirm password
            <input type="password" name="passwordConfirm" defaultValue={state.values?.passwordConfirm} required />
          </label>
          <div>
            {state.errors.passwordConfirm && <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>}
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage