import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface FormData {
  name: string
  email: string
  phone: string
  title?: string
  linkedin?: string
  discord?: string
  website?: string
  address?: string
  company?: string
  bio?: string
  qrCode?: string
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
      },
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      layout: Layout.left,
      setLayout: (layout) => set({ layout }),
    }),
    {
      name: "card-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useCardStore
