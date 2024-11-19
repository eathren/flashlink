import { Timestamp } from 'firebase/firestore'

export interface Field {
  title: string
  value: string
  shown: boolean
  order: number
  icon: JSX.Element
  placeholder: string
}

export interface CardProfileDetails {
  name?: string
  jobTitle?: string
  companyName?: string
  email?: string
  phone?: string
  address?: string
  bio?: string
  pronouns?: string
  location?: string
}

export interface BusinessCard {
  id: string
  userId: string
  profileId: string
  linksId: string
  themeColor?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Links {
  fields: Field[]
}
