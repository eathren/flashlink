import clsx from 'clsx'
import React from 'react'

interface InputWithIconProps {
  icon: React.ReactNode | null
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  themeColor?: string
  id: string
  name: string
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  value,
  onChange,
  placeholder,
  themeColor,
  id,
  name
}) => {
  return (
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
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default InputWithIcon
