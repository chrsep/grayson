import { Category } from "@prisma/client"

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

export default categories
