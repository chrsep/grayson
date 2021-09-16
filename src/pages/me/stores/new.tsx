import Divider from "@components/divider"
import React, { ChangeEvent } from "react"
import { getSession } from "next-auth/client"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import TextField from "@components/text-field"
import Button from "@components/button"
import Textarea from "@components/textarea"
import { useForm } from "react-hook-form"
import { PostStoreBody } from "@api/stores"
import { useRouter } from "next/router"
import ImageSelectorWIthSmallPreview from "@components/ImageSelectorWIthSmallPreview"
import { uploadImage } from "@lib/image-client"
import Breadcrumbs from "@components/breadcrumbs"

const NewStore: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const { watch, setValue, setError, register, handleSubmit, formState } = useForm<PostStoreBody>({
    mode: "onChange",
    defaultValues: {
      logo: null
    }
  })
  const router = useRouter()
  const { isDirty, isValid } = formState

  const onSubmit = async (data: PostStoreBody) => {
    const result = await fetch("/api/stores", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data)
    })

    if (result.ok) await router.push("/me/stores")
  }

  const handleChangeLogo = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    const result = await uploadImage(e.target.files[0])
    if (result === null) {
      setError("logo", {
        type: "fetch",
        message: "Oops, upload gambar gagal, tolong coba kembali."
      })
      return
    }

    setValue("logo", result, { shouldDirty: true })
  }

  return (
    <div className="sm:px-6 lg:px-8 pt-8 pb-32 mx-auto max-w-7xl">
      <Breadcrumbs breadcrumbs={[{ name: "Toko anda", href: "/me/stores", current: false }]} />

      <div className="md:flex md:justify-between md:items-center px-4 sm:px-0 mt-2">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold leading-7 text-gray-900 sm:truncate">
            Buat toko baru
          </h2>
        </div>
      </div>

      <Divider />

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-bold leading-6 text-gray-900">Data kontak</h3>
              <p className="mt-1 text-sm text-gray-600">
                Data kontak anda akan digunakan pembeli untuk menghubungi anda dan melanjutkan
                transaksi saat checkout.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 mt-5 md:mt-0">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-hidden sm:rounded-md shadow">
                <div className="sm:p-6 py-5 px-4 bg-white">
                  <div className="grid grid-cols-6 gap-6">
                    <ImageSelectorWIthSmallPreview
                      label="Logo toko"
                      onChange={handleChangeLogo}
                      className="col-span-full"
                      placeholder="/icons/building-warehouse.svg"
                      value={watch("logo")}
                    />

                    <TextField
                      label="Nama toko*"
                      type="text"
                      containerClassName="col-span-6 sm:col-span-4"
                      required
                      {...register("name")}
                    />

                    <Textarea
                      rows={3}
                      label="Tentang toko anda"
                      containerClassName="col-span-6"
                      {...register("description")}
                    />

                    <TextField
                      label="Nomor telefon"
                      autocomplete="phone"
                      containerClassName="col-span-6 sm:col-span-4"
                      placeholder="+62-1234-2322-1999"
                      iconSrc="/icons/phone.svg"
                      {...register("phone")}
                    />

                    <TextField
                      label="WhatsApp"
                      autocomplete="phone"
                      containerClassName="col-span-6 sm:col-span-4"
                      iconSrc="/icons/brand-whatsapp.svg"
                      placeholder="+62-1234-2322-1999"
                      {...register("whatsapp")}
                    />

                    <TextField
                      label="Alamat"
                      containerClassName="col-span-6"
                      autocomplete="street-address"
                      {...register("address")}
                    />

                    <TextField
                      label="Kota"
                      containerClassName="col-span-6 md:col-span-2"
                      {...register("city")}
                    />

                    <TextField
                      label="Provinsi"
                      containerClassName="col-span-3 md:col-span-2"
                      {...register("province")}
                    />

                    <TextField
                      label="Kode Pos"
                      containerClassName="col-span-3 md:col-span-2"
                      autocomplete="postal-code"
                      {...register("postcode")}
                    />

                    {/* TODO(cart): Enable when we start working on cart */}
                    {/* <Textarea */}
                    {/*  rows={6} */}
                    {/*  label="Cara pembayaran" */}
                    {/*  containerClassName="col-span-6" */}
                    {/*  placeholder={howToPayPlaceholder} */}
                    {/*  {...register("howToPay")} */}
                    {/* /> */}
                    {/* <p className="col-span-4 text-sm text-gray-500"> */}
                    {/*  Berikan instruksi cara pembayaran setelah pembeli checkout */}
                    {/* </p> */}
                  </div>
                </div>

                <div className="flex items-center py-3 px-4 sm:px-6 text-left bg-gray-50">
                  <p className="text-sm text-gray-500">
                    Data dengan tanda bintang (*) harus di-isi.
                  </p>
                  <Button type="submit" className="ml-auto" disabled={!isDirty || !isValid}>
                    Simpan
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }
  // Pass data to the page via props
  return { props: {} }
}

export default NewStore
