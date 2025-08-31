import { auth } from "@/lib/auth"
import { Suspense } from 'react'

async function HomePage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              NYXXUS
            </h1>
            <div className="text-3xl font-bold text-gray-300 mb-2">ESPORTS</div>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Premier tournament registration platform for competitive gaming
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 shadow-2xl mb-12">
            {session ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>

                <h2 className="text-4xl font-bold mb-6">Welcome Back, Champion!</h2>
                <div className="mb-8">
                  <p className="text-gray-300 mb-2">Logged in as:</p>
                  <p className="text-2xl font-semibold text-white mb-2">{session.user?.name}</p>
                  <p className="text-sm text-gray-400 mb-6">{session.user?.email}</p>
                </div>

                {session.user?.email === process.env.ADMIN_EMAIL ? (
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="text-2xl font-bold text-yellow-300">ADMIN ACCESS GRANTED</span>
                    </div>
                    <p className="text-yellow-200 mb-4">You have full administrative privileges</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="bg-yellow-500/20 rounded-lg px-4 py-2">
                        <span className="text-sm text-yellow-200">Tournament Management</span>
                      </div>
                      <div className="bg-yellow-500/20 rounded-lg px-4 py-2">
                        <span className="text-sm text-yellow-200">User Management</span>
                      </div>
                      <div className="bg-yellow-500/20 rounded-lg px-4 py-2">
                        <span className="text-sm text-yellow-200">Registration Control</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span className="text-2xl font-bold text-blue-300">PLAYER ACCESS</span>
                    </div>
                    <p className="text-blue-200">Ready to compete in tournaments!</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Browse Tournaments
                    </div>
                  </button>

                  <button className="group bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      My Registrations
                    </div>
                  </button>
                </div>

                <a 
                  href="/api/auth/signout"
                  className="inline-block bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 px-8 rounded-xl transition-all duration-200"
                >
                  Sign Out
                </a>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>

                <h2 className="text-4xl font-bold mb-6">Ready to Compete?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Sign in with Google to register for tournaments, manage your team, and compete with the best players worldwide
                </p>

                <a 
                  href="/api/auth/signin"
                  className="group inline-flex items-center bg-gradient-to-r from-white to-gray-100 text-black font-bold py-4 px-8 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Sign In with Google
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 text-center hover:bg-gray-900/70 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Tournament Registration</h3>
            <p className="text-gray-400">Easy signup process with unique NY## codes and real-time availability tracking</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 text-center hover:bg-gray-900/70 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Team Management</h3>
            <p className="text-gray-400">Organize your squad, manage member details, and track team performance</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 text-center hover:bg-gray-900/70 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Platform</h3>
            <p className="text-gray-400">Google OAuth authentication, admin controls, and enterprise-grade security</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-gray-400">Registered Players</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
            <div className="text-gray-400">Tournaments Hosted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">$25K+</div>
            <div className="text-gray-400">Prize Pool Distributed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
            <div className="text-gray-400">Support Available</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2025 Nyxxus Esports. Built with Next.js, powered by Vercel.</p>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    }>
      <HomePage />
    </Suspense>
  )
}