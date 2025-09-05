// components/CertificateCard.tsx
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

interface CertificateCardProps {
  name: string
  organization: string
  year: string
  description: string
  borderColor: string
}

export default function CertificateCard({ name, organization, year, description, borderColor }: CertificateCardProps) {
  return (
    <Card className={`border-l-4 ${borderColor}`}>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2">{name}</CardTitle>
        <CardDescription className="text-lg font-semibold mb-2 text-yellow-600">
          {organization}
        </CardDescription>
        <p className="text-gray-600">{year} | {description}</p>
      </CardContent>
    </Card>
  )
}