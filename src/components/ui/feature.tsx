import React from 'react'

interface FeatureProps {
  header: string
  body: string
}

const Feature: React.FC<FeatureProps> = ({ header, body }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">{header}</h3>
      <p className="mt-2">{body}</p>
    </div>
  )
}

export default Feature
