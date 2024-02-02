import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import type { GetServerSidePropsContext } from "next"
import { authOptions } from "src/app/authOptions"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/calendar/day" } }
  }

  const providers = await getProviders()

  return {
    props: { providers: providers ?? [] },
  }
}
