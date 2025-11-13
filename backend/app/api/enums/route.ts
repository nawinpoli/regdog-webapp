import { ok } from '@/lib/http'

export async function GET() {
  return ok({
    Gender: ['MALE', 'FEMALE', 'UNKNOWN'],
    EventCategory: ['ACTIVITY', 'HEALTH', 'EXPENSE'],
    LostStatus: ['NORMAL', 'LOST', 'FOUND', 'UNKNOWN'],
  })
}
