import React, { useState } from 'react'
import { linkConfig } from '@/config/links'
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
  IconPhone
} from '@tabler/icons-react'
import { useCard } from '@/features/dashboard/hooks/use-card'
import { LinksDialog } from './links-dialog'

const iconMap = {
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
  phone: <IconPhone />
}

const Links: React.FC = () => {
  const { getLinks, setLinks, updateLink } = useCard()
  const links = getLinks()
  const [availableLinks, setAvailableLinks] = useState(linkConfig)

  const handleAddLink = (category: string, link: any) => {
    if (!links) return
    const newLink = {
      title: link.title,
      link: '',
      shown: true,
      icon: link.icon,
      placeholder: link.placeholder
    }
    setLinks([...links, newLink])
    setAvailableLinks(prev => ({
      ...prev,
      [category]: prev[category].filter(
        (item: any) => item.title !== link.title
      )
    }))
  }

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-xl">Added Links</h2>
      {links?.map((link, index) => (
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
              value={link.link}
              onChange={e => updateLink(index, 'link', e.target.value)}
              placeholder={link.placeholder}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={link.shown}
              onChange={e => updateLink(index, 'shown', e.target.checked)}
              className="form-checkbox"
            />
            <span>Show</span>
          </label>
        </div>
      ))}
      <div className="space-y-2">
        <h2 className="font-bold text-xl">Available Links</h2>
        {Object.entries(availableLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="font-bold text-lg">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {links.map((link, index) => (
                <LinksDialog
                  key={index}
                  category={category}
                  link={link}
                  onSubmit={() => handleAddLink(category, link)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Links
