export const Category = {
  MAKANAN: "MAKANAN",
  SENI: "SENI",
  PAKAIAN: "PAKAIAN",
  JASA: "JASA",
  EDUKASI: "EDUKASI",
  LAINNYA: "LAINNYA"
} as const

const categories = [
  {
    id: Category.MAKANAN,
    name: "Makanan",
    slug: "makanan"
  },
  {
    id: Category.SENI,
    name: "Seni",
    slug: "seni"
  },
  {
    id: Category.PAKAIAN,
    name: "Pakaian",
    slug: "pakaian"
  },
  {
    id: Category.EDUKASI,
    name: "Edukasi",
    slug: "edukasi"
  },
  {
    id: Category.JASA,
    name: "Jasa",
    slug: "jasa"
  },
  {
    id: Category.LAINNYA,
    name: "Lainnya",
    slug: "lainnya"
  }
]

export const findCategoryById = (id: string) => {
  return (
    categories.find((c) => c.id === id) || {
      id: Category.LAINNYA,
      name: "Lainnya",
      slug: "lainnya"
    }
  )
}

export const findCategoryBySlug = (slug: string) => {
  return (
    categories.find((c) => c.slug === slug) || {
      id: Category.LAINNYA,
      name: "Lainnya",
      slug: "lainnya"
    }
  )
}

export default categories
