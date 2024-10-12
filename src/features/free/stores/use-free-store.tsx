import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface FormData {
  name?: string
  email?: string
  phone?: string
  title?: string
  address?: string
  company?: string
  bio?: string
  vcf?: string
  showIcons?: boolean
  links?: {
    linkedin?: string
    discord?: string
    website?: string
    twitter?: string
    github?: string
    [key: string]: string | undefined
  }
}

export enum Layout {
  left = "left",
  center = "center",
  right = "right",
}

interface CardStore {
  formData: FormData
  setFormData: (data: Partial<FormData>) => void
  layout: Layout
  setLayout: (layout: Layout) => void
  vcfChecked: boolean
  setVcfChecked: (checked: boolean) => void
  color: string
  setColor: (color: string) => void
  showIcons: boolean
  setShowIcons: (showIcons: boolean) => void
}

const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      formData: {
        name: "",
        email: "",
        phone: "",
        address: "",
        company: "",
        bio: "",
        vcf: "",
        links: {
          linkedin: "",
          discord: "",
          website: "",
          twitter: "",
          github: "",
        },
      },
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      layout: Layout.left,
      setLayout: (layout) => set({ layout }),
      vcfChecked: false,
      setVcfChecked: (checked) => set({ vcfChecked: checked }),
      color: "#ffffff",
      setColor: (color) => set({ color }),
      showIcons: false,
      setShowIcons: (showIcons) => set({ showIcons }),
    }),
    {
      name: "card-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useCardStore
