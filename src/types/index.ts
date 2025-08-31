export interface User {
  id: string
  name?: string | null
  email: string
  image?: string | null
  isAdmin?: boolean
}

export interface GamePortal {
  id: string
  eventName: string
  maxTeams: number
  entryFees: string
  prizePool: string
  eventBio: string
  smallRules: string
  eventStartDate: Date
  createdAt: Date
  updatedAt: Date
  registrations?: Registration[]
  _count?: {
    registrations: number
  }
}

export interface Registration {
  id: string
  userId: string
  portalId: string
  teamName: string
  teamMembers: string
  contactInfo: string
  registrationCode: string
  status: RegistrationStatus
  createdAt: Date
  updatedAt: Date
  user?: User
  portal?: GamePortal
}

export interface HomeContent {
  id: string
  aboutUs: string
  contactUs: string
  createdAt: Date
  updatedAt: Date
}

export type RegistrationStatus = 'Payment Pending' | 'Paid' | 'Cancelled'

export interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  error?: string
  data?: T
}