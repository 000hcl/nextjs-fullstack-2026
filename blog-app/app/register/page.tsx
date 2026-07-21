"use client"
import { registerUser } from "../actions/users"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/app/components/NotificationContext"


const RegisterPage = () => {
  const initialState = { 
    error: '', 
    values: {
      username: '',
      name: '',
      password: '',
      passwordConfirm: ''
    },
    success: false
  }
  const [state, formAction] = useActionState(registerUser, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      showNotification('user registered successfully')
      router.push('/login')
    }

  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction} className="space-y-2">
        <div>
          <div>
            {state.error && <p style={{ color: "red" }}>{state.error}</p>}
          </div>
          <label className="text-gray-500 text-s">
            Username 
            <input type="text" name="username" defaultValue={state.values?.username} required className="border rounded p-1"/>
          </label>

        </div>
        <div>
          <label className="text-gray-500 text-s">
            Name 
            <input type="text" name="name" defaultValue={state.values?.name} required className="border rounded p-1"/>
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-s">
            Password 
            <input type="password" name="password" defaultValue={state.values?.password} required className="border rounded p-1"/>
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-s">
            Confirm password 
            <input type="password" name="passwordConfirm" defaultValue={state.values?.passwordConfirm} required className="border rounded p-1"/>
          </label>

        </div>
        <button type="submit" className="border rounded p-1 hover:bg-emerald-200">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage