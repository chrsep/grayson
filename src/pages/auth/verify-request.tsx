import LogoStandalone from "@components/LogoStandalone"
import Image from "@components/Image"
import Link from "@components/Link"
import Button from "@components/Button"

const VerifyRequest = () => (
  <div className="min-h-screen bg-white flex">
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <Link href="/">
            <LogoStandalone className="h-12 w-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Masuk ke akun anda</h2>
        </div>

        <div className="bg-green-100 rounded-xl p-4 border-green-600 border flex items-center my-4">
          <img src="/icons/check.svg" alt="" className="w-6" />
          <p className="ml-4 opacity-70">E-mail terkirim, cek Inbox anda untuk masuk.</p>
        </div>

        <Link href="/auth/signin">
          <Button className="w-full">Kembali</Button>
        </Link>
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

export default VerifyRequest
