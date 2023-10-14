import Navbar from "./Navbar"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

function Layout(props: any) {
  return (
    <>
      <Navbar />
      <main className="p-8 lg:p-12 min-h-screen">{props.children}</main>
    </>
  )
}

export default Layout
