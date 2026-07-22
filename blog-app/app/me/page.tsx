import { getCurrentUser } from "../services/session"
import { createNewToken } from "../actions/users"
const MePage = async () => {
  const user = await getCurrentUser()

  return(
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My profile</h2>
      <b>Name: </b><>{user?.name}</>
      <br />
      <b>Username: </b><>{user?.username}</>
      <div className="max-w-2xl mx-auto p-6 space-y-2">
        <h3 className="text-xl font-bold mb-4">API token</h3>
        <div className="border rounded p-3 bg-gray-50">
          {user?.token ? user?.token : "No token generated yet"}
        </div>
        <button className="border rounded p-1 hover:bg-emerald-200" onClick={createNewToken}>
          Generate new API token
        </button>
      </div>
    </div>
  )

}

export default MePage