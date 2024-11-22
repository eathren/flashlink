import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useCard } from '@/features/dashboard/hooks/use-card'
import { CardProvider } from '@/features/dashboard/contexts/card-context'
import Profile from './profile'
import Links from './links'
import { Button } from '@/components/ui/button'

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

const EditCardContents = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const { card, updateProfileField, setThemeColor, submitCard } = useCard()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await submitCard()
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Card className="w-full max-w-4xl m-auto min-h-screen rounded-none shadow-xl border border-gray-200 mt-10">
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex justify-around">
            <TabsTrigger value="profile" className="w-full text-center">
              Profile
            </TabsTrigger>
            <TabsTrigger value="links" className="w-full text-center">
              Links
            </TabsTrigger>
            {/* <TabsTrigger value="information" className="w-full text-center">
              Information
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="links">
            <Links />{' '}
          </TabsContent>
        </Tabs>
        <Button onClick={handleSubmit} loading={isSubmitting} className="mt-4">
          Save
        </Button>
      </CardContent>
    </Card>
  )
}

export const EditCard = () => {
  return (
    <CardProvider>
      <EditCardContents />
    </CardProvider>
  )
}

export default EditCard
