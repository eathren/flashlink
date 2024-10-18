import clsx from 'clsx'
import React from 'react'

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

  return (
    <div className="flex items-center py-2 border-b border-black border-opacity-10">
      <div
        style={{ backgroundColor: themeColor }}
        className={clsx(
          'rounded-full p-2 flex items-center justify-center ',
          themeColor != '#ffffff' && 'text-white'
        )}
      >
        {icon}
      </div>
      <span className="text-gray-700 ml-2 font-semibold">{text}</span>
    </div>
  )
}

export default FieldWithIcon
