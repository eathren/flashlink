import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { CardLink } from '@/features/dashboard/types/card'
import { Checkbox } from '@/components/ui/checkbox'

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

export const LinksDialog = ({
  category,
  link,
  onSubmit
}: {
  category: string
  link: CardLink
  onSubmit: () => void
}) => {
  const [open, setOpen] = useState(false)
  const { getLinks, setLinks, updateLink } = useCard()
  const links = getLinks()
  const [linkData, setLinkData] = useState(link)

  const handleChange = (key: string, value: string | boolean) => {
    setLinkData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSubmit = () => {
    if (!links) return
    console.log('links', links)
    setOpen(false)

    const existingLinkIndex = links.findIndex(l => l.title === linkData.title)
    if (existingLinkIndex !== -1) {
      updateLink(existingLinkIndex, 'link', linkData.link)
      updateLink(existingLinkIndex, 'shown', linkData.shown)
    } else {
      setLinks([...links, linkData])
    }
    onSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md"
        >
          {iconMap[link.icon]}
          <span>{link.title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <DialogTitle className="text-lg font-semibold text-gray-900">
          {link.title}
        </DialogTitle>
        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label className="block text-sm font-medium text-gray-700">
                Title
              </Label>
              <Input
                type="text"
                value={linkData.title}
                onChange={e => handleChange('title', e.target.value)}
                placeholder="Title"
                className="mt-1 p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Link
            </Label>
            <Input
              type="text"
              value={linkData.link}
              onChange={e => handleChange('link', e.target.value)}
              placeholder={link.placeholder}
              className="mt-1 p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={linkData.shown}
              onCheckedChange={checked => handleChange('shown', checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <Label className="text-sm font-medium text-gray-700">Show</Label>
          </div>
          <Button onClick={handleSubmit} className="w-full mt-4">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
