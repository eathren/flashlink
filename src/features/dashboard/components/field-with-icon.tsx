import clsx from 'clsx'
import React from 'react'
import toast from 'react-hot-toast'

interface FieldWithIconProps {
  icon: React.ReactNode
  text: string | undefined
  themeColor?: string
}

const FieldWithIcon: React.FC<FieldWithIconProps> = ({
  icon,
  text,
  themeColor
}) => {
  if (!text) return null
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text)
    toast.success('Text copied to clipboard!')
  }
  return (
    <div
      className="flex items-center py-2 hover:bg-gray-100 p-2 rounded-md border-black border-opacity-10 space-x-4"
      onClick={handleCopyToClipboard}
    >
      <div
        style={{ backgroundColor: themeColor }}
        className={clsx(
          'rounded-full p-2 flex items-center justify-center',
          themeColor !== '#ffffff' && 'text-white'
        )}
      >
        {icon}
      </div>
      <span className="text-gray-700 ml-2 font-semibold break-all whitespace-normal">
        {text}
      </span>
    </div>
  )
}

export default FieldWithIcon
