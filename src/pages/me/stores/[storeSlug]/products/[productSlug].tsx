import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { getSession } from "next-auth/client"
import { findProductBySlugWithImages, findStoreWithProductsBySlug } from "@lib/db"
import { useForm } from "react-hook-form"
import React, { ChangeEventHandler, FC, useState } from "react"
import { uploadImage } from "@lib/image-client"
import PageContainer from "@components/container"
import Breadcrumbs, { Breadcrumb } from "@components/breadcrumbs"
import TextField from "@components/text-field"
import Pricefield from "@components/pricefield"
import Textarea from "@components/textarea"
import UploadImageButton from "@components/upload-image-button"
import Divider from "@components/divider"
import ProductImagePreviews from "@components/product-image-previews"
import Button from "@components/button"
import { PostProductBody } from "@api/stores/[storeId]/products"
import categories from "@lib/categories"
import Select from "@components/select"
import { useRouter } from "next/router"
import { Product, ProductImage, Store } from "@prisma/client"
import SEO from "@components/seo"

type FormData = Omit<PostProductBody, "storeSlug" | "price" | "images"> & { price: string }

const EditProduct: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs,
  product,
  store
}) => {
  const [images, setImages] = useState(product.images.map(({ key }) => key))
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
    const result = await fetch(`/api/products/${product.id}`, {
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
    if (!e.target.files?.[0]) return

    const result = await uploadImage(e.target.files[0])
    if (result) {
      setImages([...images, result])
      setImageChanged(true)
    }
  }

  return (
    <PageContainer>
      <SEO title={`Edit ${product.name}`} />

      <div className="px-4 sm:px-0">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="pb-5 border-b border-gray-200">
          <h2 className="pt-4 text-2xl sm:text-3xl font-bold leading-7 text-gray-900 sm:truncate">
            Ubah produk
          </h2>
        </div>
      </div>

      <div className="mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="mb-1 text-lg font-bold leading-6 text-gray-900">Data produk</h3>
              <p className="mt-1 text-sm text-gray-600">
                Isi data produk atau jasa yang ingin anda pasang.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 mt-5 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-hidden sm:rounded-lg shadow">
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
                        setImages(images.filter((image) => file !== image))
                        setImageChanged(true)
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center py-3 px-4 sm:px-6 text-left bg-gray-50">
                  <p className="mr-4 text-sm text-gray-500">
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

        <Divider className="hidden sm:block" />
        <DangerZone productId={product.id} storeSlug={store.slug} />
      </div>
    </PageContainer>
  )
}

const DangerZone: FC<{ productId: string; storeSlug: string }> = ({ productId, storeSlug }) => {
  const router = useRouter()
  const handleDelete = async () => {
    const deleteResponse = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      credentials: "include"
    })

    if (deleteResponse.ok) await router.replace(`/me/stores/${storeSlug}`)
  }

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 mt-8 sm:mt-0">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="mb-4 text-lg leading-6 text-gray-900">Danger Zone</h3>
        </div>
      </div>

      <div className="md:col-span-2 mt-5 md:mt-0">
        <div className="flex sm:overflow-hidden items-center py-4 px-6 bg-white sm:rounded-lg shadow">
          <p className="text-sm text-gray-500">
            Data produk ini tak akan bisa dikembalikan setelah dihapus
          </p>
          <Button
            variant="outline"
            className="flex-shrink-0 ml-auto text-red-700 hover:bg-red-100"
            onClick={handleDelete}
          >
            Hapus produk
          </Button>
        </div>
      </div>
    </div>
  )
}

interface Props {
  store: Store & { products: Product[] }
  product: Product & { images: ProductImage[] }
  breadcrumbs: Breadcrumb[]
}

interface Query extends NodeJS.Dict<string> {
  storeSlug: string
  productSlug: string
}
export const getServerSideProps: GetServerSideProps<Props, Query> = async (context) => {
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

  const { productSlug, storeSlug } = context.params

  const store = await findStoreWithProductsBySlug(storeSlug)
  if (!store) return { notFound: true }

  const product = await findProductBySlugWithImages(productSlug)
  if (!product) return { notFound: true }

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
