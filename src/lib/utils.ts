export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>\"'&]/g, (match) => {
      const map: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '&': '&amp;'
      }
      return map[match]
    })
    .trim()
}

export function generateRegistrationCode(): string {
  const randomNum = Math.floor(Math.random() * 99) + 1
  return `NY${randomNum.toString().padStart(2, '0')}`
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function isAdminUser(email?: string | null): boolean {
  if (!email) return false
  return email === process.env.ADMIN_EMAIL
}

export function generateSecretKey(): string {
  if (typeof window !== 'undefined') {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
  }
  return require('crypto').randomBytes(32).toString('base64')
}