import CategoryNavigation from "@components/CategoryNavigation"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import { findProductBySlug } from "@lib/db"
import Image from "@components/Image"
import { useState } from "react"
import { toIDR } from "@lib/currency"
import Button from "@components/Button"
import Breadcrumbs from "@components/Breadcrumbs"

const profile = {
  name: "Ricardo Cooper",
  imageUrl:
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  coverImageUrl:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  about:
    "\n        <p>\n          Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.\n        </p>\n        <p>\n          Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.\n        </p>\n      ",
  fields: {
    Phone: "(555) 123-4567",
    Email: "ricardocooper@example.com",
    Title: "Senior Front-End Developer",
    Team: "Product Development",
    Location: "San Francisco",
    Sits: "Oasis, 4th floor",
    Salary: "$145,000",
    Birthday: "June 8, 1990"
  }
}

const ProductPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  product
}) => {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div>
      <CategoryNavigation />

      <main className="sm:flex">
        <div className="flex-1 sm:p-8">
          <Image
            src={product.images[selectedImage]?.objectName || "/empty-image-placeholder.jpeg"}
            layout="responsive"
            objectFit="contain"
            width={200}
            height={200}
            className="w-full bg-black sm:rounded-xl"
          />
        </div>

        <div className="text-gray-900 flex-1 max-w-2xl">
          <div className="p-4 sm:p-8 ">
            <Breadcrumbs
              className="my-4"
              breadcrumbs={[
                {
                  href: "/categories/makanan",
                  name: "Makanan",
                  current: true
                }
              ]}
            />

            <h1 className="text-4xl font-light mb-4 mt-8 text-gray-700">{product.name}</h1>
            <h2 className="text-2xl font-bold mb-4">{toIDR(product.price)}</h2>
            <Button className="w-full sm:text-lg py-4 my-4">
              <img src="/icons/shopping-cart-plus-light.svg" alt="" className="mr-4 opacity-90" />
              Masukan ke keranjang
            </Button>

            <div className="prose sm:prose-sm mt-16">
              <h3>Tentang Produk Ini</h3>
              {product.description.split("\n").map((text) => (
                <p>{text}</p>
              ))}
            </div>
          </div>

          <article className="sm:mx-8 mt-8 bg-white overflow-hidden sm:rounded-xl sm:border sm:shadow-md">
            {/* Profile header */}
            <div>
              <div>
                <Image
                  className="h-32 w-full object-cover lg:h-48"
                  src="/store-cover-placeholder.jpg"
                  layout="responsive"
                  width={700}
                  height={200}
                  alt=""
                />
              </div>
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-white">
                    <Image
                      className="rounded-full"
                      layout="responsive"
                      src={product.store.logo || "/empty-logo-placeholder.jpeg"}
                      height={96}
                      width={96}
                      alt=""
                    />
                  </div>
                  <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {product.store.name}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description list */}
            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 pb-6">
              <dl className="grid gap-x-4 gap-y-4 grid-cols-2">
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Telfon</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.store.phone}</dd>
                </div>

                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">WhatsApp</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.store.whatsapp}</dd>
                </div>

                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {`${product.store.address}, ${product.store.city}, ${product.store.province}, ${product.store.postcode}`}
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Tentang Toko</dt>
                  <dd
                    className="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
                    dangerouslySetInnerHTML={{ __html: product.store.description }}
                  />
                </div>
              </dl>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({
  query: { productSlug }
}: GetServerSidePropsContext<{ productSlug: string }>) {
  const product = await findProductBySlug(productSlug as string)

  // Pass data to the page via props
  return { props: { product } }
}

export default ProductPage
