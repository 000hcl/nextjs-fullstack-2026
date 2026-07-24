import { getCurrentUser } from "../services/session"
import { createNewToken } from "../actions/users"
import { getReadingList } from "../services/readinglist"
import Link from "next/link"
const MePage = async () => {
  const user = await getCurrentUser()
  const list = await getReadingList()

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
      <div className="max-w-2xl mx-auto p-6 space-y-2">
        <h3 className="text-xl font-bold mb-4">Reading List</h3>
        <ul className="space-y-2">
          {list.map(r => <li key={r.id} className="flex items-center border rounded p-3 hover:bg-gray-50">
            <Link href={`/blogs/${r.blog.id}`}>
              {r.blog.title} by {r.blog.author}
            </Link>
            
            {!r.read &&
              <button className="ml-auto border rounded p-1 hover:bg-emerald-200">
                mark as read
              </button>}
          </li>)}
        </ul>

      </div>
    </div>
  )

}

export default MePage