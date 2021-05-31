import React, { ChangeEvent } from "react"
import { findStoreBySlug } from "@lib/db"
import { getSession } from "next-auth/client"
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next"
import StoreAdminHeading from "@components/StoreAdminHeading"
import TextField from "@components/TextField"
import Textarea from "@components/Textarea"
import ImageSelectorWIthSmallPreview from "@components/ImageSelectorWIthSmallPreview"
import Button from "@components/Button"
import { useForm } from "react-hook-form"
import { PostStoreBody } from "@api/stores"
import { uploadImage } from "@lib/image"
import PageContainer from "@components/Container"

const howToPayPlaceholder = `Contoh: 
- Pembayaran dapat dilakukan dengan transfer ke .... 
- Pembayaran dapat dilakukan saat saya sampai di lokasi anda...
`

const StoreProfile: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  breadcrumbs,
  tabs,
  store
}) => {
  const { reset, watch, setValue, setError, register, handleSubmit, formState } =
    useForm<PostStoreBody>({
      mode: "onChange",
      defaultValues: {
        logo: store.logo,
        name: store.name,
        description: store.description,
        whatsapp: store.whatsapp,
        postcode: store.postcode,
        province: store.province,
        city: store.city,
        address: store.address,
        phone: store.phone,
        howToPay: store.howToPay
      }
    })

  const { isDirty, isValid } = formState

  const onSubmit = async (data: PostStoreBody) => {
    const result = await fetch(`/api/stores/${store.slug}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(data)
    })

    if (result.ok) {
      const updatedStore = await result.json()
      reset({
        logo: updatedStore.logo,
        name: updatedStore.name,
        description: updatedStore.description,
        whatsapp: updatedStore.whatsapp,
        postcode: updatedStore.postcode,
        province: updatedStore.province,
        city: updatedStore.city,
        address: updatedStore.address,
        phone: updatedStore.phone,
        howToPay: updatedStore.howToPay
      })
    }
  }

  const handleChangeLogo = async (e: ChangeEvent<HTMLInputElement>) => {
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
    <PageContainer>
      <div className="px-4 sm:px-0">
        <StoreAdminHeading breadcrumbs={breadcrumbs} name={store.name} tabs={tabs} />
      </div>

      <div className="mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Data kontak</h3>
              <p className="mt-1 text-sm text-gray-600">
                Data kontak anda akan digunakan pembeli untuk menghubungi anda dan melanjutkan
                transaksi saat checkout.
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
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

                    <ImageSelectorWIthSmallPreview
                      label="Logo toko"
                      onChange={handleChangeLogo}
                      className="col-span-full"
                      placeholder="/icons/building-warehouse.svg"
                      value={watch("logo")}
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
                      label="Kota / Kecamatan"
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

                    <Textarea
                      rows={6}
                      label="Cara pembayaran"
                      containerClassName="col-span-6"
                      placeholder={howToPayPlaceholder}
                      {...register("howToPay")}
                    />
                    <p className="col-span-4 text-sm text-gray-500">
                      Berikan instruksi cara pembayaran setelah pembeli checkout
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-left sm:px-6 flex items-center sticky sm:relative bottom-0 border-t">
                  <p className="mt-1 text-sm text-gray-500">
                    Data yang diperlukan ditandai dengan tanda bintang (*)
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
    </PageContainer>
  )
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ storeSlug: string }>
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

  const { storeSlug } = context.params
  const store = await findStoreBySlug(storeSlug)

  // Pass data to the page via props
  return {
    props: {
      store,
      tabs: [
        { name: "Produk", href: `/me/stores/${storeSlug}`, current: false },
        { name: "Profil toko", href: `/me/stores/${storeSlug}/profile`, current: true }
      ],
      breadcrumbs: [{ name: "Toko anda", href: "/me/stores", current: false }]
    }
  }
}

export default StoreProfile
