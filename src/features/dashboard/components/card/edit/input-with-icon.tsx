import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import React from 'react'

interface InputWithIconProps {
  icon: React.ReactNode | null
  title: string | undefined
  value: string | undefined
  shown: boolean
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onShownChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  themeColor?: string
  id: string
  name: string
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  title,
  value,
  shown,
  onTitleChange,
  onValueChange,
  onShownChange,
  placeholder,
  themeColor,
  id,
  name
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center py-2 hover:bg-gray-100 p-2 rounded-md border-black border-opacity-10 space-x-4">
        <div
          style={{ backgroundColor: themeColor, opacity: icon ? 1 : 0 }}
          className={clsx(
            'rounded-full p-2 flex items-center justify-center min-w-10',
            themeColor !== '#ffffff' && 'text-white'
          )}
        >
          {icon}
        </div>
        <Input
          type="text"
          id={`${id}-title`}
          name={`${name}-title`}
          value={title}
          onChange={onTitleChange}
          placeholder={placeholder}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Input
        type="text"
        id={`${id}-value`}
        name={`${name}-value`}
        value={value}
        onChange={onValueChange}
        placeholder="Value"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="flex items-center space-x-2">
        <Input
          type="checkbox"
          id={`${id}-shown`}
          name={`${name}-shown`}
          checked={shown}
          onChange={onShownChange}
          className="form-checkbox"
        />
        <span>Show</span>
      </label>
    </div>
  )
}

export default InputWithIcon
