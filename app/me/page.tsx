import { getCurrentUser } from "../services/session"
import { createNewToken } from "../actions/users"
import { getReadingList } from "../services/readinglist"
import { markAsRead } from "../actions/readinglist"
import { redirect } from "next/navigation"
import Link from "next/link"
const MePage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  const unreadList = await getReadingList(false)
  const readList = await getReadingList(true)


  return(
    <div className="max-w-2xl mx-auto p-6" data-testid='user-profile'>
      <h2 className="text-2xl font-bold mb-4">My profile</h2>
      <b>Name: </b><div data-testid='user-name' >{user?.name}</div>
      <br />
      <b>Username: </b><div data-testid='user-username' >{user?.username}</div>
      <div className="max-w-2xl mx-auto p-6 space-y-2" data-testid='api-token-section'>
        <h3 className="text-xl font-bold mb-4">API token</h3>
        <div className="border rounded p-3 bg-gray-50" data-testid='token-display'>
          {user?.token ? <div data-testid='api-token'>{user?.token}</div> : <div data-testid='no-token-message'>No token generated yet</div>}
        </div>
        <form action={createNewToken}>
          <button className="border rounded p-1 hover:bg-emerald-200" type="submit" data-testid='generate-token-button'>
            Generate new API token
          </button>
        </form>
      </div>
    <h2 className="text-2xl font-bold mb-4">Reading List</h2>
      <div className="max-w-2xl mx-auto p-6 space-y-2" data-testid='reading-list-section'>
        <h3 className="text-xl font-bold mb-4">Unread ({unreadList.length})</h3>
        <ul className="space-y-2" data-testid="unread-section">
          {unreadList.length === 0 && readList.length === 0 && <div data-testid="empty-reading-list">Your reading list is empty</div>}
          {unreadList.length === 0 && readList.length > 0 && <div data-testid="no-unread-blogs">You have no unread blogs</div>}
          {unreadList.map(r => <li key={r.id} className="flex items-center border rounded p-3 hover:bg-gray-50">
            <Link href={`/blogs/${r.blog.id}`}>
              {r.blog.title} by {r.blog.author}
            </Link>
            
            {!r.read &&
              <form action={markAsRead}>
                <input type="hidden" name="id" value={r.blog.id} />
                <button type="submit" data-testid="mark-read-" className="ml-auto border rounded p-1 hover:bg-emerald-200">
                  mark as read
                </button>
              </form>}
              

          </li>)}
        </ul>

      </div>
      <div className="max-w-2xl mx-auto p-6 space-y-2">
        <h3 className="text-xl font-bold mb-4">Read ({readList.length})</h3>
        <ul className="space-y-2">
          {readList.map(r => <li key={r.id} className="flex items-center border rounded p-3 hover:bg-gray-50">
            <Link href={`/blogs/${r.blog.id}`}>
              {r.blog.title} by {r.blog.author}
            </Link>

          </li>)}
        </ul>

      </div>
    </div>
  )

}

export default MePage