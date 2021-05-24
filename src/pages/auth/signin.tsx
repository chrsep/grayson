import LogoStandalone from "@components/LogoStandalone"
import Image from "next/image"
import TextField from "@components/TextField"
import Checkbox from "@components/Checkbox"
import Button from "@components/Button"
import Link from "@components/Link"
import { useState } from "react"
import { signIn } from "next-auth/client"

const SignIn = () => {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link href="/">
              <LogoStandalone className="h-12 w-auto" />
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Masuk ke akun anda</h2>
          </div>

          <div className="mt-8">
            {/* <div> */}
            {/*  <div> */}
            {/*    <p className="text-sm font-medium text-gray-700">Masuk dengan</p> */}

            {/*    <div className="mt-1 grid grid-cols-3 gap-3"> */}
            {/*      <button */}
            {/*        type="button" */}
            {/*        className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 flex" */}
            {/*        onClick={() => signIn("facebook")} */}
            {/*      > */}
            {/*        Facebook */}
            {/*      </button> */}

            {/*      <button */}
            {/*        type="button" */}
            {/*        className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" */}
            {/*        onClick={() => signIn("google")} */}
            {/*      > */}
            {/*        Google */}
            {/*      </button> */}

            {/*      <button */}
            {/*        type="button" */}
            {/*        className="w-full inline-flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" */}
            {/*        onClick={() => signIn("twitter")} */}
            {/*      > */}
            {/*        Twitter */}
            {/*      </button> */}
            {/*    </div> */}
            {/*  </div> */}

            {/*  <div className="mt-6 relative"> */}
            {/*    <div className="absolute inset-0 flex items-center" aria-hidden="true"> */}
            {/*      <div className="w-full border-t border-gray-300" /> */}
            {/*    </div> */}
            {/*    <div className="relative flex justify-center text-sm"> */}
            {/*      <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span> */}
            {/*    </div> */}
            {/*  </div> */}
            {/* </div> */}

            <div className="mt-6">
              <form
                action="#"
                method="POST"
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  signIn("email", { email })
                }}
              >
                <TextField
                  id="email"
                  label="Alamat email"
                  autocomplete="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                />

                <div className="flex items-center justify-between">
                  <Checkbox
                    id="remember_me"
                    name="remember_me"
                    label="Ingat saya"
                    onChange={() => {}}
                    checked={false}
                  />
                </div>

                <Button type="submit">Masuk</Button>

                <div className="text-sm text-center">
                  Belum punya akun? <Link href="/auth/signup">Daftar sekarang</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/sigin-hero.jpeg"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  )
}

export default SignIn
