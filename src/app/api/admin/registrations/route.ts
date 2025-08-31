import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get all registrations (Admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ 
        success: false,
        error: 'Admin access required' 
      }, { status: 403 })
    }

    const registrations = await prisma.registration.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        portal: {
          select: {
            eventName: true,
            entryFees: true,
            prizePool: true,
            eventStartDate: true,
            maxTeams: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ 
      success: true,
      registrations 
    })
  } catch (error) {
    console.error('Admin get registrations error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch registrations' 
    }, { status: 500 })
  }
}