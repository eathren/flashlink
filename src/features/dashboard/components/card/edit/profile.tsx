import { useState } from 'react'
import { InputForProfile } from './input-for-profile'
import { Button } from '@/components/ui/button'
import { Check } from 'tabler-icons-react'
import { Spinner } from '@/components/ui/spinner'
import { useCard } from '@/features/dashboard/hooks/use-card'
import { CardInformation } from '@/features/dashboard/types/card'

const presetColors = [
  '#D3D3D3', // Grey
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#FF33A5', // Pink
  '#33FFA5', // Mint
  '#FFA533', // Orange
  '#8E33FF', // Purple
  '#FF3380', // Magenta
  '#33FFD7', // Aqua
  '#FFDA33', // Yellow
  '#33A5FF', // Sky Blue
  '#848884' // Red
]

export const EditCardProfile = () => {
  const { card, updateProfileField, setThemeColor, submitCard } = useCard()

  const handleProfileChange = (key: keyof CardInformation, value: string) => {
    updateProfileField(key, value)
  }

  const handleColorChange = (color: string) => {
    setThemeColor(color)
  }

  return (
    <>
      <h1 className="text-xl font-bold"> About </h1>
      {card && card.profile && (
        <InputForProfile
          name={card.profile.firstName || ''}
          location={card.profile.location || ''}
          jobTitle={card.profile.jobTitle || ''}
          pronouns={card.profile.pronouns || ''}
          bio={card.profile.bio || ''}
          onProfileChange={handleProfileChange}
        />
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {presetColors.map(color => (
          <Button
            type="button"
            key={color}
            style={{ backgroundColor: color }}
            className="h-8 w-8 p-0 border border-gray-300"
            onClick={() => handleColorChange(color)}
          >
            {card?.themeColor === color && (
              <Check className="text-white w-4 h-4 absolute" />
            )}
          </Button>
        ))}
      </div>
    </>
  )
}

export default EditCardProfile
