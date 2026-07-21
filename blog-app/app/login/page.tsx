"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="text-gray-500 text-s">
            Username
            <input type="text" name="username" required className="border rounded p-1"/>
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-s">
            Password
            <input type="password" name="password" required className="border rounded p-1"/>
          </label>
        </div>
        <button type="submit" className="border rounded p-1 hover:bg-emerald-200">Login</button>
      </form>
    </div>
  )
}