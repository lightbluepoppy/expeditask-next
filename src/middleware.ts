export { default } from "next-auth/middleware"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "src/app/authOptions"
// import { redirect } from "next/navigation"

// export async function middleware() {
//   const session = await getServerSession(authOptions)
//   if (session == null) {
//     return redirect("/login")
//   }
// }
export const config = { matcher: ["/calendar/:path*"] }
