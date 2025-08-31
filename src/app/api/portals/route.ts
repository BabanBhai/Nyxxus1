import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sanitizeInput } from '@/lib/utils'

// Get all portals with registration counts
export async function GET(request: NextRequest) {
  try {
    const portals = await prisma.gamePortal.findMany({
      include: {
        _count: {
          select: {
            registrations: {
              where: {
                status: {
                  not: 'Cancelled'
                }
              }
            }
          }
        }
      },
      orderBy: { eventStartDate: 'asc' }
    })

    return NextResponse.json({ 
      success: true,
      portals 
    })
  } catch (error) {
    console.error('Get portals error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch portals' 
    }, { status: 500 })
  }
}

// Create new portal (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ 
        success: false,
        error: 'Admin access required' 
      }, { status: 403 })
    }

    const body = await request.json()
    const { 
      eventName, 
      maxTeams, 
      entryFees, 
      prizePool, 
      eventBio, 
      smallRules,
      eventStartDate 
    } = body

    // Validate required fields
    if (!eventName || !maxTeams || !entryFees || !prizePool || !eventBio || !smallRules || !eventStartDate) {
      return NextResponse.json({ 
        success: false,
        error: 'All fields are required' 
      }, { status: 400 })
    }

    // Validate event start date is in the future
    const startDate = new Date(eventStartDate)
    if (startDate <= new Date()) {
      return NextResponse.json({ 
        success: false,
        error: 'Event start date must be in the future' 
      }, { status: 400 })
    }

    // Create portal
    const portal = await prisma.gamePortal.create({
      data: {
        eventName: sanitizeInput(eventName),
        maxTeams: parseInt(maxTeams),
        entryFees: sanitizeInput(entryFees),
        prizePool: sanitizeInput(prizePool),
        eventBio: sanitizeInput(eventBio),
        smallRules: sanitizeInput(smallRules),
        eventStartDate: startDate
      }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Tournament created successfully',
      portal
    })
  } catch (error) {
    console.error('Create portal error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to create tournament' 
    }, { status: 500 })
  }
}