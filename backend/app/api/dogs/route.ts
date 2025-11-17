import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, badRequest, serverError } from '@/lib/http'
import { dogCreateSchema } from '@/lib/validators'
import { calculateAge } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'))
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get('pageSize') ?? '20')))
  const userId = searchParams.get('userId') ? Number(searchParams.get('userId')) : undefined

  const where = userId ? { userId } : undefined

  const [items, total] = await Promise.all([
    prisma.dog.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.dog.count({ where }),
  ])

  // เพิ่ม age field ให้แต่ละตัว
  const itemsWithAge = items.map(dog => ({
    ...dog,
    age: calculateAge(dog.birthDate)
  }))

  return ok({ items: itemsWithAge, page, pageSize, total })
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const body = dogCreateSchema.parse(json)

    const dog = await prisma.dog.create({ data: body })
    return ok({ ...dog, age: calculateAge(dog.birthDate) }, { status: 201 })
  } catch (err: any) {
    if (err?.name === 'ZodError') return badRequest('Invalid body', err)
    if (err?.code === 'P2003') return badRequest('Invalid userId')
    return serverError(err)
  }
}
