import React, { FC, Fragment, SyntheticEvent, useRef, useState } from "react"
import { Menu, Popover, Transition } from "@headlessui/react"
import Icon from "@components/Icon"
import Link from "next/link"
import { signout } from "next-auth/client"
import LogoFull from "@components/LogoFull"
import LogoStandalone from "@components/LogoStandalone"
import Button from "@components/Button"
import CartSlideOver from "@components/CartSlideOver"
import Image from "@components/Image"
import TextField from "@components/TextField"
import { useRouter } from "next/router"
import categories from "@lib/categories"
import useGetUser from "@lib/auth/useGetUser"
import clsx from "clsx"

const navigations = [
  {
    name: "Home",
    href: "/"
  }
]

const Navbar: FC = () => {
  const router = useRouter()

  return (
    <Popover
      as="nav"
      className="bg-gradient-to-tr from-primary-500 to-indigo-700 sticky top-0 z-30"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <Icon src="/icons/x-light.svg" /> : <Icon src="/icons/menu-light.svg" />}
                </Popover.Button>
                <Link href="/">
                  <a className="flex-shrink-0 flex items-center ml-4">
                    <LogoStandalone className="block lg:hidden h-8 w-auto" />
                  </a>
                </Link>
              </div>

              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start flex-shrink-0">
                <Link href="/">
                  <a className="flex-shrink-0 flex items-center hidden sm:block">
                    <LogoStandalone className="hidden sm:block lg:hidden h-8 w-auto " />
                    <LogoFull className="hidden lg:block h-8 w-auto" />
                  </a>
                </Link>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigations.map((item) => {
                      const current = router.asPath === item.href

                      return (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={clsx(
                              current
                                ? "bg-gray-900 text-white bg-opacity-20 "
                                : "text-gray-300 hover:bg-white hover:bg-opacity-20  hover:text-white",
                              "px-3 py-2 rounded-md text-sm  "
                            )}
                            aria-current={current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="absolute ml-[91px] inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <SearchField />
                <Cart />
                <UserProfile />
              </div>
            </div>
          </div>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigations.map((item) => {
                  const current = router.asPath === item.href

                  return (
                    <Link href={item.href}>
                      <a
                        className={clsx(
                          current
                            ? "bg-gray-900 text-white bg-opacity-20 "
                            : "text-gray-300 hover:bg-gray-700 hover:bg-opacity-20  hover:text-white",
                          "block px-3 py-2 rounded-md text-base "
                        )}
                        aria-current={current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  )
                })}
              </div>

              <div className="px-2 pt-2 pb-3 space-y-1">
                <div className="text-white px-3 py-3 text-sm border-b border-white border-opacity-10">
                  Kategori
                </div>
                {categories.map((item) => {
                  const current = router.asPath.endsWith(item.slug)

                  return (
                    <Link href={`/categories/${item.slug}`}>
                      <a
                        className={clsx(
                          current
                            ? "bg-gray-900 text-white bg-opacity-20 "
                            : "text-gray-300 hover:bg-gray-700 hover:bg-opacity-20  hover:text-white",
                          "block px-3 py-2 rounded-md text-base "
                        )}
                        aria-current={current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  )
                })}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

const SearchField = () => {
  const input = useRef<HTMLInputElement>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleShowSearchBar = () => {
    setShowSearch(true)
    requestAnimationFrame(() => {
      input.current?.focus()
    })
  }

  const searchProduct = async (e: SyntheticEvent) => {
    e.preventDefault()
    const queryString = encodeURIComponent(search)
    await router.push(`/search?q=${queryString}`)
    setShowSearch(false)
  }

  return (
    <>
      <div className="min-w-0 px-4 sm:px-6 ">
        <Button
          variant="icon"
          className="opacity-80 hover:opacity-100 transition-opacity block sm:hidden"
          onClick={handleShowSearchBar}
        >
          <img src="/icons/search-light.svg" className="w-5 h-5 m-2 " alt="keranjang anda" />
        </Button>
        <button
          type="button"
          className="w-full bg-white bg-opacity-20 py-2 px-3 pr-14 rounded-md leading-5 text-white text-sm truncate hidden sm:flex max-w-sm"
          onClick={handleShowSearchBar}
        >
          <img
            src="/icons/search-light.svg"
            className="h-5 w-5 opacity-70 mr-3"
            aria-hidden="true"
            alt=""
          />
          <span className="-pb-6">{search || "Cari produk"}</span>
        </button>
      </div>

      {showSearch && (
        <div className="fixed top-0 left-0 right-0 flex items-center z-20 bg-white border-b h-16 sm:px-4">
          <Button variant="icon" className="ml-4" onClick={() => setShowSearch(false)}>
            <img src="/icons/x.svg" className="w-6 h-6" alt="tutup input pencarian" />
          </Button>

          <form className="flex  items-center w-full" onSubmit={searchProduct}>
            <TextField
              type="search"
              iconSrc="/icons/search.svg"
              hideLabel
              name="search-product"
              label="cari produk"
              containerClassName="w-full px-4 py-2 bg-transparent block rounded-xl "
              inputClassName="border-none shadow-none"
              placeholder="Cari produk"
              ref={input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              type="submit"
              variant="outline"
              className="text-primary-500 font-bold mr-4"
              disabled={search === ""}
            >
              Cari
            </Button>
          </form>
        </div>
      )}
    </>
  )
}

const UserProfile = () => {
  const { data } = useGetUser()

  if (!data?.user?.email) {
    return (
      <Link href="/auth/signin">
        <a>
          <Button variant="outline" className="text-gray-400">
            Masuk
          </Button>
        </a>
      </Link>
    )
  }

  return (
    <Menu as="div" className="relative flex-shrink-0">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-gray-100 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <div className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100 border">
                {data.user?.image ? (
                  <Image
                    width={100}
                    height={100}
                    src={data.user?.image}
                    className="h-full w-full text-gray-300"
                    objectFit="cover"
                  />
                ) : (
                  <img
                    width={100}
                    height={100}
                    src="/icons/user-circle.svg"
                    className="h-full w-full text-gray-300 bg-gray-300"
                    alt=""
                  />
                )}
              </div>
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
              <Menu.Item>
                {({ active }) => (
                  <Link href="/me/profile">
                    <a
                      className={clsx(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      Profil anda
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="/me/stores">
                    <a
                      className={clsx(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      Toko anda
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => signout()}
                    className={clsx(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-red-600 !text-left w-full hover:bg-gray-100"
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
