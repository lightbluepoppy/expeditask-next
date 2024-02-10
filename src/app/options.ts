// import type { NextAuthOptions } from "next-auth"
// import GitHubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import { DrizzleAdapter } from "@auth/drizzle-adapter"
// import { db } from "backend/db/server"

// export const options: NextAuthOptions = {
//   debug: true,
//   session: { strategy: "jwt" },
//   adapter: DrizzleAdapter(db),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   callbacks: {
//     jwt: async ({ token, user, account, profile, isNewUser }) => {
//       if (user) {
//         token.user = user
//         const u = user as any
//         token.role = u.role
//       }
//       if (account) {
//         token.accessToken = account.access_token
//       }
//       return token
//     },
//     session: ({ session, token }) => {
//       token.accessToken
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           role: token.role,
//         },
//       }
//     },
//   },
// }
