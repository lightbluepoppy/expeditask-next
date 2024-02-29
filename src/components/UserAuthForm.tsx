"use client"

import * as React from "react"

import { cn } from "src/libs/utils"
import { Button } from "src/components/ui/button"
import { Input } from "src/components/ui/input"
import { Label } from "src/components/ui/label"
import { FiGithub } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"
import { getServerSideProps } from "src/libs/auth"
import { signIn, signOut, useSession } from "next-auth/react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const handleLogin = (provider: string) => () => {
    signIn(provider, { callbackUrl: `http://localhost:3000/calendar/day` })
  }

  const { data: session, status } = useSession()
  // console.log(status)

  return (
    <div className={cn("grid", className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="expeditask@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <Button>
            {/* {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />} */}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="grid gap-2">
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          className="text-md"
          onMouseDown={handleLogin("google")}
        >
          {/* {isLoading ? ( */}
          {/*   <LuLoader2 className="mr-2 h-4 w-4 animate-spin" /> */}
          {/* ) : ( */}
          <FcGoogle className="mr-2 h-6 w-6" />
          {/* )} */}
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          className="text-md"
          onMouseDown={handleLogin("")}
        >
          {/* {isLoading ? ( */}
          {/*   <LuLoader2 className="mr-2 h-4 w-4 animate-spin" /> */}
          {/* ) : ( */}
          <FiGithub className="mr-2 h-6 w-6" />
          {/* )} */}
          GitHub
        </Button>
        <Button
          variant="default"
          type="button"
          className="text-md"
          onMouseDown={() => signOut()}
        >
          Log out
        </Button>
      </div>
    </div>
  )
}
