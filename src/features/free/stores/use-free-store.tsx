import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface FormData {
  name?: string
  email?: string
  phone?: string
  title?: string
  linkedin?: string
  discord?: string
  website?: string
  address?: string
  company?: string
  bio?: string
  qrCode?: string
  vcf?: string
  links?: string[]
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
}

const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      formData: {
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        discord: "",
        website: "",
        address: "",
        company: "",
        qrCode: "",
        bio: "",
        vcf: "",
      },
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      layout: Layout.left,
      setLayout: (layout) => set({ layout }),
      vcfChecked: false,
      setVcfChecked: (checked) => set({ vcfChecked: checked }), // Adjusted to accept boolean
    }),
    {
      name: "card-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useCardStore
