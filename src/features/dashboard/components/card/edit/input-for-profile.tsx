import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

interface InputForProfileProps {
  name: string
  location: string
  jobTitle: string
  pronouns: string
  bio: string
  onProfileChange: (key: string, value: string) => void
}

export const InputForProfile: React.FC<InputForProfileProps> = ({
  name,
  location,
  jobTitle,
  pronouns,
  bio,
  onProfileChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-medium text-gray-700">Name</Label>
        <Input
          type="text"
          value={name}
          onChange={e => onProfileChange('name', e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-gray-700">
          Location
        </Label>
        <Input
          type="text"
          value={location}
          onChange={e => onProfileChange('location', e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-gray-700">
          Job Title
        </Label>
        <Input
          type="text"
          value={jobTitle}
          onChange={e => onProfileChange('jobTitle', e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-gray-700">
          Pronouns
        </Label>
        <Input
          type="text"
          value={pronouns}
          onChange={e => onProfileChange('pronouns', e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div>
        <Label className="block text-sm font-medium text-gray-700">Bio</Label>
        <textarea
          value={bio}
          onChange={e => onProfileChange('bio', e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
    </div>
  )
}
