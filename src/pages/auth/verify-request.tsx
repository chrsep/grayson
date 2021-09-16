import LogoStandalone from "@components/logo-standalone"
import Image from "next/image"
import Link from "@components/link"
import Button from "@components/button"
import Hero from "@public/signup-hero.jpeg"

const VerifyRequest = () => (
  <div className="flex min-h-screen bg-white">
    <div className="flex flex-col flex-1 lg:flex-none justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
      <div className="mx-auto w-full lg:w-96 max-w-sm">
        <div>
          <Link href="/">
            <LogoStandalone className="w-auto h-12" />
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Masuk ke akun anda</h2>
        </div>

        <div className="flex items-center p-4 my-4 bg-green-100 rounded-xl border border-green-600">
          <img src="/icons/check.svg" alt="" className="w-6" />
          <p className="ml-4 text-sm opacity-70">E-mail terkirim, cek Inbox anda untuk masuk.</p>
        </div>

        <Link href="/auth/signin">
          <Button className="w-full">Kembali</Button>
        </Link>
      </div>
    </div>

    <div className="hidden lg:block relative flex-1 w-0">
      <Image
        className="object-cover absolute inset-0 w-full h-full"
        placeholder="blur"
        src={Hero}
        layout="fill"
        objectFit="cover"
        alt=""
      />
    </div>
  </div>
)

export default VerifyRequest
