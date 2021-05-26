import Breadcrumbs from "@components/Breadcrumbs"
import React from "react"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import { getSession } from "next-auth/client"
import { findStoreWithProductsBySlug } from "@lib/db"
import PageContainer from "@components/Container"
import TextField from "@components/TextField"
import Textarea from "@components/Textarea"
import Button from "@components/Button"
import { useForm } from "react-hook-form"
import { PostStoreBody } from "@api/stores"
import { useRouter } from "next/router"

const NewProduct: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs
}) => {
  const { register, handleSubmit } = useForm<PostStoreBody>()
  const router = useRouter()

  const onSubmit = async (data: PostStoreBody) => {
    const result = await fetch("/api/stores", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data)
    })

    if (result.ok) await router.push("/me/stores")
  }

  return (
    <PageContainer>
      <div className="px-4 sm:px-0">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="pb-5 border-b border-gray-200">
          <h2 className="pt-4 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Produk baru
          </h2>
        </div>
      </div>

      <div className="mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Data produk</h3>
              <p className="mt-1 text-sm text-gray-600">
                Berikan data kontak toko anda agar pengguna lain dapat menghubungi anda.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <TextField
                      id="name"
                      label="Nama produk*"
                      name="name"
                      type="text"
                      containerClassName="col-span-6 sm:col-span-4"
                      required
                      {...register("name")}
                    />

                    <Textarea
                      id="description"
                      name="description"
                      rows={3}
                      label="Tentang toko anda"
                      onChange={() => {}}
                      value=""
                      containerClassName="col-span-6"
                      {...register("description")}
                    />

                    <TextField
                      label="Nomor telefon"
                      value=""
                      onChange={() => {}}
                      autocomplete="phone"
                      id="phone_number"
                      name="phone_number"
                      type="text"
                      containerClassName="col-span-6 sm:col-span-4"
                      placeholder="+62-1234-2322-1999"
                      iconSrc="/icons/phone.svg"
                      {...register("phone")}
                    />

                    <TextField
                      label="WhatsApp"
                      value=""
                      onChange={() => {}}
                      autocomplete="phone"
                      id="whatsapp"
                      name="whatsapp"
                      type="text"
                      containerClassName="col-span-6 sm:col-span-4"
                      iconSrc="/icons/brand-whatsapp.svg"
                      placeholder="+62-1234-2322-1999"
                      {...register("whatsapp")}
                    />

                    <TextField
                      label="Alamat"
                      value=""
                      onChange={() => {}}
                      containerClassName="col-span-6"
                      type="text"
                      name="street_address"
                      id="street_address"
                      autocomplete="street-address"
                      {...register("address")}
                    />

                    <TextField
                      label="Kota / Kecamatan"
                      value=""
                      onChange={() => {}}
                      containerClassName="col-span-6 md:col-span-2"
                      type="text"
                      name="city"
                      id="city"
                      {...register("city")}
                    />

                    <TextField
                      label="Provinsi"
                      value=""
                      onChange={() => {}}
                      containerClassName="col-span-3 md:col-span-2"
                      type="text"
                      name="province"
                      id="province"
                      {...register("province")}
                    />

                    <TextField
                      label="Kode Pos"
                      value=""
                      onChange={() => {}}
                      containerClassName="col-span-3 md:col-span-2"
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      autocomplete="postal-code"
                      {...register("postcode")}
                    />
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-left sm:px-6 flex items-center">
                  <p className="mt-1 text-sm text-gray-500">
                    Data yang diperlukan ditandai dengan tanda bintang (*)
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

export async function getServerSideProps(context: GetServerSidePropsContext<{ slug: string }>) {
  const session = await getSession(context)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }

  const { slug } = context.params
  const store = await findStoreWithProductsBySlug(slug)

  // Pass data to the page via props
  return {
    props: {
      store,
      breadcrumbs: [
        { name: "Toko anda", href: "/me/stores", current: false },
        { name: "Stark Industries", href: `/me/stores/${slug}`, current: true }
      ]
    }
  }
}

export default NewProduct
