import { useAuthContext } from "@/contexts/AuthContext"
import Link from "next/link"

export default function Navbar() {
  const { user } = useAuthContext()
  return (
    <header className="bg-slate-900 text-white flex justify-between p-4">
      <Link href="/">Wishlist</Link>
      <nav>
        {!user && <Link href="/login">Logga in</Link>}
        {user && (
          <p>Inloggad</p>
          // <Link>Mina listor</Link>
          // <Link>Alla listor</Link>
          // <Link>Lägg till lista</Link>
        )}
        Links goes here...
      </nav>
    </header>
  )
}
