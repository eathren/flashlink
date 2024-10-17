import { Timestamp } from 'firebase/firestore'

export interface BusinessCard {
  accreditations?: string
  address?: string
  companyName?: string
  companyUrl?: string
  countryCode?: string
  createdAt?: Timestamp
  department?: string
  description?: string
  email?: string
  headline?: string
  id?: string
  imageUrl?: string
  jobTitle?: string
  links?: Links
  name?: string
  phone?: string
  qrCode?: string
  themeColor?: string
  title?: string
  updatedAt?: Timestamp
  userId?: string
  vcf?: string
}

interface Links {
  calendly?: string
  cashapp?: string
  discord?: string
  facebook?: string
  github?: string
  instagram?: string
  linkedIn?: string
  paypal?: string
  signal?: string
  skype?: string
  snapchat?: string
  telegram?: string
  threads?: string
  tiktok?: string
  twitch?: string
  twitter?: string
  venmo?: string
  website?: string
  whatsapp?: string
  yelp?: string
  youtube?: string
  [key: string]: string | undefined
}
