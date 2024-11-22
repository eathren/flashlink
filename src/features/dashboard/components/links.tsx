import React from 'react'
import { linkConfig } from '@/config/links'
import { useCard } from '@/contexts/CardContext'
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandPaypal,
  IconBrandSkype,
  IconBrandSnapchat,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandTwitch,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconCash,
  IconLink,
  IconMail,
  IconMapPin,
  IconPhone,
  IconVideo,
  IconMusic
} from '@tabler/icons-react'

const iconMap: { [key: string]: JSX.Element } = {
  discord: <IconBrandDiscord />,
  facebook: <IconBrandFacebook />,
  github: <IconBrandGithub />,
  instagram: <IconBrandInstagram />,
  linkedin: <IconBrandLinkedin />,
  paypal: <IconBrandPaypal />,
  skype: <IconBrandSkype />,
  snapchat: <IconBrandSnapchat />,
  telegram: <IconBrandTelegram />,
  tiktok: <IconBrandTiktok />,
  twitch: <IconBrandTwitch />,
  whatsapp: <IconBrandWhatsapp />,
  youtube: <IconBrandYoutube />,
  cash: <IconCash />,
  link: <IconLink />,
  mail: <IconMail />,
  mapPin: <IconMapPin />,
  phone: <IconPhone />,
  video: <IconVideo />,
  music: <IconMusic />
}

const Links: React.FC = () => {
  const { card, updateLink } = useCard()

  return (
    <div className="space-y-4">
      {Object.entries(linkConfig).map(([category, links]) => (
        <div key={category}>
          <h2 className="font-bold text-xl">{category}</h2>
          {links.map((link, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex items-center py-2 hover:bg-gray-100 p-2 rounded-md border-black border-opacity-10 space-x-4">
                <div
                  style={{ opacity: iconMap[link.icon] ? 1 : 0 }}
                  className="rounded-full p-2 flex items-center justify-center min-w-10 text-white"
                >
                  {iconMap[link.icon]}
                </div>
                <input
                  type="text"
                  value={
                    card?.fields?.find(field => field.title === link.title)
                      ?.link || ''
                  }
                  onChange={e => updateLink(index, 'link', e.target.value)}
                  placeholder={link.placeholder}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={
                    card?.fields?.find(field => field.title === link.title)
                      ?.shown || false
                  }
                  onChange={e => updateLink(index, 'shown', e.target.checked)}
                  className="form-checkbox"
                />
                <span>Show</span>
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Links
