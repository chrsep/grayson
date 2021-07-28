import Breadcrumbs, { Breadcrumb } from "@components/Breadcrumbs"
import React, { ChangeEventHandler, useState } from "react"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage
} from "next"
import { getSession } from "next-auth/client"
import { findStoreWithProductsBySlug } from "@lib/db"
import PageContainer from "@components/Container"
import TextField from "@components/TextField"
import Textarea from "@components/Textarea"
import Button from "@components/Button"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { PostProductBody } from "@api/stores/[storeId]/products"
import Pricefield from "@components/Pricefield"
import Divider from "@components/Divider"
import { uploadImage } from "@lib/image-client"
import UploadImageButton from "@components/UploadImageButton"
import ProductImagePreviews from "@components/ProductImagePreviews"
import categories from "@lib/categories"
import Select from "@components/Select"
import { Category, Product, Store } from "@prisma/client"
import { ParsedUrlQuery } from "querystring"

type FormData = Omit<PostProductBody, "storeSlug" | "price" | "images"> & { price: string }

const NewProduct: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs,
  store
}) => {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      category: Category.LAINNYA
    }
  })

  const onSubmit = async (data: FormData) => {
    const price = parseInt(data.price, 10)

    const result = await fetch(`/api/stores/${store.id}/products`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ ...data, price, images })
    })

    if (result.ok) await router.push(`/me/stores/${store.slug}`)
  }

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files?.[0]) return
    const result = await uploadImage(e.target.files[0])
    if (result) {
      setImages([...images, result])
    }
  }

  return (
    <PageContainer>
      <div className="px-4 sm:px-0">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="pb-5 border-b border-gray-200">
          <h2 className="pt-4 text-2xl sm:text-3xl font-bold leading-7 text-gray-900 sm:truncate">
            Produk baru
          </h2>
        </div>
      </div>

      <div className="mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg leading-6 text-gray-900">Data produk</h3>
              <p className="mt-1 text-sm text-gray-600">
                Isi data produk atau jasa yang ingin anda pasang.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 mt-5 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-hidden sm:rounded-md shadow">
                <div className="sm:p-6 py-5 px-4 bg-white">
                  <div className="grid grid-cols-6 gap-6">
                    <TextField
                      label="Nama produk*"
                      containerClassName="col-span-6 sm:col-span-4"
                      required
                      {...register("name")}
                    />

                    <Pricefield
                      label="Harga*"
                      containerClassName="col-span-6 sm:col-span-2"
                      required
                      {...register("price")}
                    />

                    <Textarea
                      rows={3}
                      label="Tentang produk anda"
                      containerClassName="col-span-6"
                      {...register("description")}
                    />

                    <Select
                      id="kategori"
                      label="Kategori"
                      containerClassName="col-span-6 sm:col-span-2"
                      {...register("category")}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="pt-12">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="">
                        <h3 className="text-lg leading-6 text-gray-900">Gambar</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Tambahkan gambar untuk produk anda.
                        </p>
                      </div>

                      <UploadImageButton
                        variant="outline"
                        className="mt-4 ml-auto w-full sm:w-auto"
                        onChange={handleImageUpload}
                      >
                        Tambah gambar
                      </UploadImageButton>
                    </div>

                    <Divider className="" />
                    <ProductImagePreviews
                      files={images}
                      onDeleteClick={(file) => {
                        setImages(images.filter((image) => image !== file))
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center py-3 px-4 sm:px-6 text-left bg-gray-50">
                  <p className="mr-4 text-sm text-gray-500">
                    Data dengan tanda bintang (*) harus di-isi.
                  </p>
                  <Button type="submit" className="ml-auto">
                    Simpan
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

interface Props {
  store: Store & { products: Product[] }
  breadcrumbs: Breadcrumb[]
}

interface Query extends ParsedUrlQuery {
  storeSlug: string
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  context: GetServerSidePropsContext<{ storeSlug: string }>
) => {
  if (!context.params) return { notFound: true }
  const session = await getSession(context)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }

  const { storeSlug } = context.params
  const store = await findStoreWithProductsBySlug(storeSlug)
  if (store === null) return { notFound: true }

  // Pass data to the page via props
  return {
    props: {
      store,
      breadcrumbs: [
        { name: "Toko anda", href: "/me/stores", current: false },
        { name: store.name, href: `/me/stores/${storeSlug}`, current: true }
      ]
    }
  }
}

export default NewProduct
