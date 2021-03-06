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
      className="sticky top-0 z-30 bg-gradient-to-tr from-primary-500 to-indigo-700"
    >
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8 mx-auto">
            <div className="flex relative justify-between items-center h-16">
              <div className="flex sm:hidden absolute inset-y-0 left-0 items-center">
                {/* Mobile menu button */}
                <Popover.Button className="inline-flex justify-center items-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 hover:bg-opacity-20 rounded-md focus:ring-2 focus:ring-inset focus:ring-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <Icon src="/icons/x.svg" className="!bg-white" />
                  ) : (
                    <Icon src="/icons/menu.svg" className="!bg-white" />
                  )}
                </Popover.Button>
                <Link href="/">
                  <a className="flex flex-shrink-0 items-center ml-4">
                    <LogoStandalone className="block lg:hidden w-auto h-8" />
                  </a>
                </Link>
              </div>

              <div className="flex flex-1 flex-shrink-0 justify-center sm:justify-start items-center sm:items-stretch">
                <Link href="/">
                  <a className="flex-shrink-0 items-center">
                    <LogoStandalone className=" hidden sm:block lg:hidden w-auto h-8" />
                    <LogoFull className="hidden lg:block w-auto h-8" />
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
                                ? " text-white bg-gray-900 bg-opacity-20"
                                : "text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-20",
                              " py-2 px-3 text-sm rounded-md"
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

              <div className="flex absolute sm:static sm:inset-auto inset-y-0 right-0 items-center pr-2 sm:pr-0 ml-[91px] sm:ml-6">
                <SearchField />
                {/* TODO(cart): Enable back when we are dealing with cart again */}
                {/* <Cart /> */}
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
                            ? " text-white bg-gray-900 bg-opacity-20"
                            : "text-gray-300 hover:text-white hover:bg-gray-700 hover:bg-opacity-20",
                          " block py-2 px-3 text-base rounded-md"
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
                <div className="py-3 px-3 text-sm text-white border-b border-white border-opacity-10">
                  Kategori
                </div>
                {categories.map((item) => {
                  const current = router.asPath.endsWith(item.slug)

                  return (
                    <Link href={`/categories/${item.slug}`}>
                      <a
                        className={clsx(
                          current
                            ? " text-white bg-gray-900 bg-opacity-20"
                            : "text-gray-300 hover:text-white hover:bg-gray-700 hover:bg-opacity-20",
                          " block py-2 px-3 text-base rounded-md"
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
      <div className=" px-4 sm:px-6 min-w-0">
        <Button
          variant="icon"
          className="block sm:hidden opacity-80 hover:opacity-100 transition-opacity"
          onClick={handleShowSearchBar}
        >
          <img src="/icons/search-light.svg" className=" m-2 w-5 h-5" alt="keranjang anda" />
        </Button>
        <button
          type="button"
          className="hidden sm:flex py-2 px-3 pr-14 w-full max-w-sm text-sm leading-5 text-white truncate bg-white bg-opacity-20 rounded-md"
          onClick={handleShowSearchBar}
        >
          <img
            src="/icons/search-light.svg"
            className="mr-3 w-5 h-5 opacity-70"
            aria-hidden="true"
            alt=""
          />
          <span className="-pb-6">{search || "Cari produk"}</span>
        </button>
      </div>

      {showSearch && (
        <div className="flex fixed top-0 right-0 left-0 z-20 items-center sm:px-4 h-16 bg-white border-b">
          <Button variant="icon" className="ml-4" onClick={() => setShowSearch(false)}>
            <img src="/icons/x.svg" className="w-6 h-6" alt="tutup input pencarian" />
          </Button>

          <form className="flex items-center w-full" onSubmit={searchProduct}>
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
              className="mr-4 font-bold text-primary-500"
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
            <Menu.Button className="flex text-sm bg-gray-100 rounded-full focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="inline-block overflow-hidden w-8 h-8 bg-gray-100 rounded-full border">
                {data.user?.image && data.user?.imageBase64 ? (
                  <Image
                    width={100}
                    height={100}
                    className="w-full h-full text-gray-300"
                    objectFit="cover"
                    src={data.user.image}
                    placeholder="blur"
                    blurDataURL={data.user.imageBase64}
                  />
                ) : (
                  <img
                    width={100}
                    height={100}
                    src="/icons/user-circle.svg"
                    className="w-full h-full text-gray-300 bg-gray-300"
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
              className="absolute right-0 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <Link href="/me/profile">
                    <a
                      className={clsx(
                        active ? "bg-gray-100" : "",
                        "block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
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
                        "block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
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
                      "block py-2 px-4 w-full text-sm !text-left text-red-600 hover:bg-gray-100"
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
        <img src="/icons/shopping-cart-white.svg" className=" m-2 w-5 h-5" alt="keranjang anda" />
      </Button>
      <CartSlideOver open={open} setOpen={setOpen} />
    </div>
  )
}

export default Navbar
