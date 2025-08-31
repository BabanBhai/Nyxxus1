import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  try {
    // Create initial game portals
    const portalsData = [
      {
        eventName: "Valorant Champions Cup 2025",
        maxTeams: 32,
        entryFees: "$50",
        prizePool: "$5000",
        eventBio: "The ultimate Valorant tournament featuring the best teams from around the globe. Experience intense tactical gameplay and strategic team coordination in this premier esports competition.",
        smallRules: "5v5 format • Best of 3 matches • All ranks welcome • No cheating or exploits • Must use official tournament client",
        eventStartDate: new Date('2025-09-15T10:00:00Z'),
      },
      {
        eventName: "BGMI Battle Royale Championship",
        maxTeams: 24,
        entryFees: "$30",
        prizePool: "$3000",
        eventBio: "Intense battle royale action in the most competitive BGMI tournament. Survive, strategize, and dominate the battlefield in this high-stakes competition.",
        smallRules: "4-player squads • Multiple rounds • Squad elimination format • No third-party software • Official BGMI version required",
        eventStartDate: new Date('2025-09-22T10:00:00Z'),
      },
      {
        eventName: "CS2 Masters Tournament",
        maxTeams: 16,
        entryFees: "$75",
        prizePool: "$8000",
        eventBio: "Premier Counter-Strike 2 tournament featuring the most skilled teams. Show your tactical prowess and aim in this competitive environment.",
        smallRules: "5v5 format • Best of 3 matches • Anti-cheat required • Official CS2 client • Team substitutions allowed",
        eventStartDate: new Date('2025-10-05T14:00:00Z'),
      }
    ]

    const portals = await prisma.gamePortal.createMany({
      data: portalsData,
      skipDuplicates: true,
    })

    console.log(`✅ Created ${portals.count} game portals`)

    // Create default home content
    await prisma.homeContent.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        aboutUs: "Nyxxus Esports is a premier gaming organization dedicated to fostering competitive excellence and building a thriving esports community. We organize tournaments, support talented players, and provide platforms for gamers to showcase their skills on the global stage.",
        contactUs: "Ready to join the action? Contact us at contact@nyxxusesports.com or follow us on social media @NyxxusEsports for the latest updates, tournament announcements, and community news. Join our Discord server for real-time communication and support!"
      },
    })

    console.log('✅ Created default home content')
    console.log('🎮 Database seeded successfully!')
    console.log('🏆 Ready for esports action!')

  } catch (error) {
    console.error('❌ Seed error:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('💥 Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })