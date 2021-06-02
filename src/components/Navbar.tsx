import React, { FC, Fragment, useState } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import Icon from "@components/Icon"
import Link from "next/link"
import { signout, useSession } from "next-auth/client"
import LogoFull from "@components/LogoFull"
import LogoStandalone from "@components/LogoStandalone"
import Button from "@components/Button"
import { classNames } from "@lib/ui"
import CartSlideOver from "@components/CartSlideOver"
import Image from "@components/Image"

interface Props {
  navigation: Array<{
    name: string
    href: string
    current: boolean
  }>
}
const Navbar: FC<Props> = ({ navigation }) => (
  <Disclosure as="nav" className="bg-primary-500 sticky top-0 z-30">
    {({ open }) => (
      <>
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? <Icon src="/icons/x-light.svg" /> : <Icon src="/icons/menu-light.svg" />}
              </Disclosure.Button>
              <LogoStandalone className="block lg:hidden h-8 w-auto ml-4" />
            </div>

            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start flex-shrink-0">
              <Link href="/">
                <a className="flex-shrink-0 flex items-center">
                  <LogoStandalone className="hidden sm:block lg:hidden h-8 w-auto " />
                  <LogoFull className="hidden lg:block h-8 w-auto" />
                </a>
              </Link>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white bg-opacity-20 "
                            : "text-gray-300 hover:bg-white hover:bg-opacity-20  hover:text-white",
                          "px-3 py-2 rounded-md text-sm  "
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute ml-[91px] inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <SearchLink />
              <Cart />
              <UserProfile />
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white bg-opacity-20 "
                      : "text-gray-300 hover:bg-gray-700 hover:bg-opacity-20  hover:text-white",
                    "block px-3 py-2 rounded-md text-base "
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
)

const SearchLink = () => (
  <div className="min-w-0 px-4 sm:px-6 ">
    <Link href="/search">
      <a>
        <Button
          variant="icon"
          className="opacity-80 hover:opacity-100 transition-opacity block sm:hidden"
        >
          <img src="/icons/search-light.svg" className="w-5 h-5 m-2 " alt="keranjang anda" />
        </Button>
      </a>
    </Link>
    <Link href="/search">
      <a className="w-full bg-white bg-opacity-20 py-2 px-3 pr-14 rounded-md leading-5 text-white text-sm truncate hidden sm:flex ">
        <img
          src="/icons/search-light.svg"
          className="h-5 w-5 opacity-70 mr-3"
          aria-hidden="true"
          alt=""
        />
        <span className="-pb-6">Cari produk</span>
      </a>
    </Link>
  </div>
)

const UserProfile = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <div className="w-[32px] h-[32px]" />
  }

  if (!session?.user?.email) {
    return (
      <Link href="/auth/signin">
        <Button variant="outline" className="text-gray-400">
          Masuk
        </Button>
      </Link>
    )
  }

  return (
    <Menu as="div" className="relative flex-shrink-0">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <Image
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                src={session.user.image || "/icons/user-circle-light.svg"}
                alt=""
              />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Link href="/me/profile">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/me/profile"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Profil anda
                    </a>
                  )}
                </Menu.Item>
              </Link>
              <Link href="/me/stores">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/me/stores"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Toko anda
                    </a>
                  )}
                </Menu.Item>
              </Link>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => signout()}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-red-600 !text-left w-full"
                    )}
                  >
                    Keluar
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

const Cart = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex-shrink-0">
      <Button
        variant="icon"
        className="mr-4 opacity-80 hover:opacity-100 transition-opacity"
        onClick={() => setOpen(!open)}
      >
        <img src="/icons/shopping-cart-white.svg" className="w-5 h-5 m-2 " alt="keranjang anda" />
      </Button>
      <CartSlideOver open={open} setOpen={setOpen} />
    </div>
  )
}

export default Navbar
