export interface BusinessCard {
  title?: string
  name?: string
  jobTitle?: string
  department?: string
  companyName?: string
  accreditations?: string
  headline?: string
  email?: string
  phone?: string
  companyUrl?: string
  address?: string
  countryCode?: string
  description?: string
  imageUrl?: string
  qrCode?: string
  id?: string
  vcf?: string
  createdAt?: number
  updatedAt?: number
  userId?: string
  links?: Links
  themeColor?: string
}

interface Links {
  linkedIn?: string
  website?: string
  discord?: string
  twitter?: string
  facebook?: string
  instagram?: string
  threads?: string
  youtube?: string
  snapchat?: string
  tiktok?: string
  twitch?: string
  yelp?: string
  whatsapp?: string
  signal?: string
  skype?: string
  telegram?: string
  github?: string
  calendly?: string
  paypal?: string
  venmo?: string
  cashapp?: string
  [key: string]: string | undefined
}
