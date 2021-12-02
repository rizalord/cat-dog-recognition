import "react"
import DefaultNavbar from "../navbars/DefaultNavbar"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DefaultNavbar />
      <main>{children}</main>
    </>
  )
}
