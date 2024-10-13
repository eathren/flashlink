export interface BusinessCard {
  title?: string
  name?: string
  email?: string
  phone?: string
  countryCode?: string
  address?: string
  company?: string
  description?: string
  imageUrl?: string
  qrCode?: string
  id?: string
  vcf?: string
  createdAt?: number
  updatedAt?: number
  userId?: string
  links?: Links
}

interface Links {
  linkedIn?: string
  website?: string
  discord?: string
  twitter?: string
  facebook?: string
  instagram?: string
  [key: string]: string | undefined // Allow for additional dynamic keys
}
