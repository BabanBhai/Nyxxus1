import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sanitizeInput, generateRegistrationCode } from '@/lib/utils'

// Create new registration
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ 
        success: false,
        error: 'Authentication required' 
      }, { status: 401 })
    }

    const body = await request.json()
    const { portalId, teamName, teamMembers, contactInfo } = body

    // Validate required fields
    if (!portalId || !teamName || !teamMembers || !contactInfo) {
      return NextResponse.json({ 
        success: false,
        error: 'All fields are required' 
      }, { status: 400 })
    }

    // Check if user already registered for this portal
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_portalId: {
          userId: session.user.id!,
          portalId: portalId
        }
      }
    })

    if (existingRegistration && existingRegistration.status !== 'Cancelled') {
      return NextResponse.json({ 
        success: false,
        error: 'You are already registered for this tournament' 
      }, { status: 400 })
    }

    // Check if portal exists and has space
    const portal = await prisma.gamePortal.findUnique({
      where: { id: portalId },
      include: {
        _count: {
          select: {
            registrations: {
              where: { status: { not: 'Cancelled' } }
            }
          }
        }
      }
    })

    if (!portal) {
      return NextResponse.json({ 
        success: false,
        error: 'Tournament not found' 
      }, { status: 404 })
    }

    if (portal._count.registrations >= portal.maxTeams) {
      return NextResponse.json({ 
        success: false,
        error: 'Tournament is full' 
      }, { status: 400 })
    }

    // Generate unique registration code
    let registrationCode: string
    let isUnique = false
    let attempts = 0

    do {
      registrationCode = generateRegistrationCode()
      const existing = await prisma.registration.findUnique({
        where: { registrationCode }
      })
      isUnique = !existing
      attempts++
    } while (!isUnique && attempts < 100)

    if (!isUnique) {
      return NextResponse.json({ 
        success: false,
        error: 'Failed to generate unique registration code' 
      }, { status: 500 })
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        userId: session.user.id!,
        portalId,
        teamName: sanitizeInput(teamName),
        teamMembers: JSON.stringify(teamMembers),
        contactInfo: sanitizeInput(contactInfo),
        registrationCode: registrationCode!,
        status: 'Payment Pending'
      }
    })

    return NextResponse.json({ 
      success: true, 
      registrationCode: registrationCode!,
      message: 'Registration successful! Join our Discord server for payment instructions: https://discord.gg/nyxxusesports',
      registration
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Registration failed' 
    }, { status: 500 })
  }
}

// Get user's registrations
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ 
        success: false,
        error: 'Authentication required' 
      }, { status: 401 })
    }

    const registrations = await prisma.registration.findMany({
      where: { userId: session.user.id! },
      include: {
        portal: {
          select: {
            eventName: true,
            entryFees: true,
            prizePool: true,
            eventStartDate: true
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
    console.error('Get registrations error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch registrations' 
    }, { status: 500 })
  }
}