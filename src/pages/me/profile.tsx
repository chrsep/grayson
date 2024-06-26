import React, { ChangeEvent, ChangeEventHandler, FC, useRef } from "react"
import Button from "@components/button"
import Divider from "@components/divider"
import TextField from "@components/text-field"
import { getSession } from "next-auth/client"
import { findUserByEmail } from "@lib/db"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useForm } from "react-hook-form"
import { PatchUserBody } from "@api/me"
import { generateS3Url, uploadImage } from "@lib/image-client"
import { mutate } from "swr"
import { User } from "@prisma/client"
import axios from "redaxios"
import Image from "@components/image"
import SEO from "@components/seo"

const Profile: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ user }) => (
  <div className="sm:px-6 lg:px-8 pt-8 pb-32 mx-auto max-w-7xl">
    <SEO title="Profil anda" />

    <div className="md:flex md:justify-between md:items-center px-4 sm:px-0 mt-2">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl sm:text-3xl font-bold leading-7 text-gray-900 sm:truncate">
          Profil anda
        </h2>
      </div>
    </div>

    <Divider />
    <PersonalInfoForm
      name={user.name}
      image={user.image}
      imageKey={user.imageKey}
      email={user.email}
    />
    <Divider className="hidden sm:block" />
    <ContactForm
      phone={user.phone}
      whatsapp={user.whatsapp}
      address={user.address}
      postcode={user.postcode}
      city={user.city}
      province={user.province}
    />
  </div>
)

const PersonalInfoForm: FC<{
  name: string
  email: string
  image: string | null
  imageKey: string | null
}> = ({ image, imageKey, name, email }) => {
  const { register, handleSubmit, formState, setValue, setError, watch, reset } = useForm<
    PatchUserBody & { image: string | null }
  >({
    defaultValues: { name, email, imageKey, image }
  })

  const submit = handleSubmit(async (formData) => {
    const { data, status } = await axios<{ updatedUser: User }>("/api/me", {
      method: "PATCH",
      data: JSON.stringify({
        email: formData.email,
        imageKey: formData.imageKey,
        name: formData.name
      })
    })
    if (status !== 200) return

    await mutate("/api/auth/session")
    reset({
      name: data.updatedUser.name,
      imageKey: data.updatedUser.imageKey,
      image: data.updatedUser.image,
      email: data.updatedUser.email
    })
  })

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    const result = await uploadImage(e.target.files[0])
    if (result === null) {
      setError("imageKey", {
        type: "fetch",
        message: "Oops, upload gambar gagal, tolong coba kembali."
      })
      return
    }

    setValue("imageKey", result, { shouldDirty: true })
    setValue("image", generateS3Url(result), { shouldDirty: true })
  }

  return (
    <div className="mt-6 md:mt-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="mb-2 text-lg font-bold leading-6 text-gray-900">Data diri</h3>
            <p className="mt-1 text-sm text-gray-600">
              Data ini akan ditampilkan pada halaman profil dan pada listing produk anda.
            </p>
          </div>
        </div>
        <div className="md:col-span-2 mt-5 md:mt-0">
          <form onSubmit={submit}>
            <div className="sm:overflow-hidden sm:rounded-md shadow">
              <div className="sm:p-6 py-5 px-4 space-y-6 bg-white">
                <TextField
                  label="Nama"
                  autocomplete="full-name"
                  containerClassName="max-w-md"
                  {...register("name")}
                />

                <TextField
                  label="Alamat email"
                  autocomplete="email"
                  containerClassName="col-span-6 sm:col-span-4"
                  iconSrc="/icons/mail.svg"
                  placeholder="jessica@hey.com"
                  type="email"
                  {...register("email")}
                />

                <ImageSelector
                  label="Foto profil"
                  image={watch("image")}
                  // imageKey={watch("imageKey")}
                  onChange={handleImageChange}
                />

                {formState.errors.imageKey && (
                  <p className="!mt-4 text-xs text-red-800">{formState.errors.imageKey.message}</p>
                )}
              </div>

              <div className="py-3 px-4 sm:px-6 text-right bg-gray-50">
                <Button type="submit" className="ml-auto" disabled={!formState.isDirty}>
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const ContactForm: FC<{
  phone: string
  whatsapp: string
  address: string
  city: string
  province: string
  postcode: string
}> = ({ address, city, province, postcode, phone, whatsapp }) => {
  const { register, handleSubmit, formState, reset } = useForm<PatchUserBody>({
    defaultValues: { phone, address, city, province, postcode, whatsapp }
  })

  const submit = async (data: PatchUserBody) => {
    const meResponse = await fetch("/api/me", {
      method: "PATCH",
      body: JSON.stringify(data)
    })

    if (!meResponse.ok) return
    const { updatedUser } = await meResponse.json()

    reset({
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      province: updatedUser.province,
      postcode: updatedUser.postcode,
      whatsapp: updatedUser.whatsapp
    })
  }
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="mb-2 text-lg font-bold leading-6 text-gray-900">Data kontak</h3>
            <p className="mt-1 text-sm text-gray-600">
              Berikan data kontak lengkap anda agar pengguna lain dapat menghubungi anda.
            </p>
          </div>
        </div>
        <div className="md:col-span-2 mt-5 md:mt-0">
          <form onSubmit={handleSubmit(submit)}>
            <div className="overflow-hidden sm:rounded-md shadow">
              <div className="sm:p-6 py-5 px-4 bg-white">
                <div className="grid grid-cols-6 gap-6">
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
                </div>
              </div>

              <div className="py-3 px-4 sm:px-6 text-right bg-gray-50">
                <Button type="submit" className="ml-auto" disabled={!formState.isDirty}>
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const ImageSelector: FC<{
  label: string
  onChange: ChangeEventHandler<HTMLInputElement>
  image?: string | null
  // imageKey?: string | null
  className?: string
}> = ({ label, image, onChange, className }) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className={`flex items-start ${className}`}>
      <label htmlFor="image-input" className="block text-sm text-gray-700">
        {label}
        <input
          id="image-input"
          type="file"
          className="hidden"
          onChange={onChange}
          ref={ref}
          accept="image/*"
        />
        <div className="flex items-center mt-1">
          <span className="inline-block overflow-hidden w-12 h-12 bg-gray-100 rounded-full border">
            {image ? (
              <Image
                width={100}
                height={100}
                src={image}
                className="w-full h-full text-gray-300"
                objectFit="cover"
                alt=""
              />
            ) : (
              <img
                width={100}
                height={100}
                src="/icons/user-circle.svg"
                className="w-full h-full text-gray-300"
                alt=""
              />
            )}
          </span>
          <Button variant="outline" className="ml-4" onClick={() => ref.current?.click()}>
            Ubah
          </Button>
        </div>
      </label>
    </div>
  )
}

interface Props {
  user: Omit<User, "emailVerified" | "createdAt" | "updatedAt"> & {
    emailVerified: string
    createdAt: string
    updatedAt: string
  }
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx)
  if (session === null) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false
      }
    }
  }

  const user = await findUserByEmail(session.user?.email || "")
  if (user === null) return { notFound: true }

  // Pass data to the page via props
  return {
    props: {
      user: {
        ...user,
        emailVerified: user?.emailVerified?.toISOString() || "",
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    }
  }
}

export default Profile
