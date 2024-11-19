import { icons } from './icons'

export const linkConfig: Record<
  string,
  { icon: JSX.Element; placeholder: string }
> = {
  email: {
    icon: icons.email,
    placeholder: 'Email'
  },
  phone: {
    icon: icons.phone,
    placeholder: 'Phone'
  },
  address: {
    icon: icons.address,
    placeholder: 'Address'
  },
  discord: {
    icon: icons.discord,
    placeholder: 'Discord'
  },
  facebook: {
    icon: icons.facebook,
    placeholder: 'Facebook'
  },
  github: {
    icon: icons.github,
    placeholder: 'GitHub'
  },
  instagram: {
    icon: icons.instagram,
    placeholder: 'Instagram'
  },
  linkedin: {
    icon: icons.linkedin,
    placeholder: 'LinkedIn'
  },
  paypal: {
    icon: icons.paypal,
    placeholder: 'PayPal'
  },
  skype: {
    icon: icons.skype,
    placeholder: 'Skype'
  },
  snapchat: {
    icon: icons.snapchat,
    placeholder: 'Snapchat'
  },
  telegram: {
    icon: icons.telegram,
    placeholder: 'Telegram'
  },
  tiktok: {
    icon: icons.tiktok,
    placeholder: 'TikTok'
  },
  twitch: {
    icon: icons.twitch,
    placeholder: 'Twitch'
  },
  whatsapp: {
    icon: icons.whatsapp,
    placeholder: 'WhatsApp'
  },
  youtube: {
    icon: icons.youtube,
    placeholder: 'YouTube'
  },
  cashapp: {
    icon: icons.cashapp,
    placeholder: 'CashApp'
  },
  website: {
    icon: icons.website,
    placeholder: 'Website'
  }
}
