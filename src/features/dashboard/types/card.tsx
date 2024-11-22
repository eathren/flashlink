import { Timestamp } from 'firebase/firestore'

export interface CardLink {
  title: string
  link: string
  shown: boolean
  order?: number
  icon: JSX.Element
  placeholder: string
}

export interface CardInformation {
  prefix?: string
  firstName: string
  middleName?: string
  lastName?: string
  suffix?: string
  accreditations?: string
  preferredName?: string
  maidenName?: string
  pronouns?: string
}

export interface CardAffiliation {
  title?: string
  department?: string
  company?: string
  headline?: string
}

export interface BusinessCard {
  id: string
  userId: string
  profile?: CardInformation
  affiliation?: CardAffiliation
  themeColor?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  links?: CardLink[]
}
