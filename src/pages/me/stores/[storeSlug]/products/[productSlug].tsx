import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import { getSession } from "next-auth/client"
import { findProductBySlugWithImages, findStoreWithProductsBySlug } from "@lib/db"
import { useForm } from "react-hook-form"
import React, { ChangeEventHandler, useState } from "react"
import { uploadImage } from "@lib/image"
import PageContainer from "@components/Container"
import Breadcrumbs from "@components/Breadcrumbs"
import TextField from "@components/TextField"
import Pricefield from "@components/Pricefield"
import Textarea from "@components/Textarea"
import UploadImageButton from "@components/UploadImageButton"
import Divider from "@components/Divider"
import ProductImagePreviews from "@components/ProductImagePreviews"
import Button from "@components/Button"
import { PostProductBody } from "@api/stores/[storeSlug]/products"
import categories from "@lib/categories"
import Select from "@components/Select"

type FormData = Omit<PostProductBody, "storeSlug" | "price" | "images"> & { price: string }

const EditProduct: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs,
  product
}) => {
  const [images, setImages] = useState(product.images.map(({ objectName }) => objectName))
  const [imageChanged, setImageChanged] = useState(false)
  const { reset, register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category
    }
  })

  const onSubmit = async (data: FormData) => {
    const price = parseInt(data.price, 10)
    if (typeof price !== "number") return

    const result = await fetch(`/api/products/${product.slug}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({ ...data, price, images })
    })

    if (result.ok) {
      const newProduct = await result.json()
      reset({
        name: newProduct.name,
        price: newProduct.price.toString(),
        description: newProduct.description,
        category: newProduct.category
      })
      setImageChanged(false)
    }
  }

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const result = await uploadImage(e.target.files[0])
    setImages([...images, result])
    setImageChanged(true)
  }

  return (
    <PageContainer>
      <div className="px-4 sm:px-0">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="pb-5 border-b border-gray-200">
          <h2 className="pt-4 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Ubah produk
          </h2>
        </div>
      </div>

      <div className="mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg  leading-6 text-gray-900 font-bold mb-1">Data produk</h3>
              <p className="mt-1 text-sm text-gray-600">
                Isi data produk atau jasa yang ingin anda pasang.
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
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
                        <h3 className="text-lg leading-6  text-gray-900">Gambar</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Tambahkan gambar untuk produk anda.
                        </p>
                      </div>

                      <UploadImageButton
                        variant="outline"
                        className="ml-auto w-full sm:w-auto mt-4"
                        onChange={handleImageUpload}
                      >
                        Tambah gambar
                      </UploadImageButton>
                    </div>

                    <Divider className="" />
                    <ProductImagePreviews
                      files={images}
                      onDeleteClick={(file) => {
                        setImages(images.filter((image) => file !== image))
                        setImageChanged(true)
                      }}
                    />
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-left sm:px-6 flex items-center">
                  <p className="text-sm text-gray-500 mr-4">
                    Data dengan tanda bintang (*) harus di-isi.
                  </p>
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={!formState.isDirty && !imageChanged}
                  >
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

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ storeSlug: string; productSlug: string }>
) {
  const session = await getSession(context)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }

  const { productSlug, storeSlug } = context.params
  const store = await findStoreWithProductsBySlug(storeSlug)

  const product = await findProductBySlugWithImages(productSlug)

  // Pass data to the page via props
  return {
    props: {
      store,
      product,
      breadcrumbs: [
        { name: "Toko anda", href: "/me/stores", current: false },
        { name: store.name, href: `/me/stores/${storeSlug}`, current: true }
      ]
    }
  }
}

export default EditProduct
