import Navbar from "./Navbar"

function Layout(props: any) {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  )
}

export default Layout
