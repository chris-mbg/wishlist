import { useAuthContext } from "@/contexts/AuthContext"
import signOut from "@/firebase/auth/signout"
import Link from "next/link"

export default function Navbar() {
  const { user } = useAuthContext()
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4">
      <Link className="font-bold" href="/">
        Wishlist
      </Link>
      <nav>
        {!user && <Link href="/login">Logga in</Link>}
        {user && (
          <div className="flex gap-4 items-center">
            <p className="text-xs">Inloggad</p>
            <Link href="/add-new-list">Lägg till lista</Link>
            <button
              className="bg-white hover:bg-gray-300 rounded p-2 text-gray-800"
              onClick={() => signOut()}
            >
              Logga ut
            </button>
          </div>
          // <Link>Alla listor</Link>
          // <Link>Lägg till lista</Link>
        )}
      </nav>
    </header>
  )
}
