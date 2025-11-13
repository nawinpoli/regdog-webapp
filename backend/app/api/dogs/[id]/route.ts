import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, badRequest, notFound, serverError } from '@/lib/http'
import { dogUpdateSchema } from '@/lib/validators'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = Number(idStr)
  if (!Number.isInteger(id)) return badRequest('Invalid id')
  const dog = await prisma.dog.findUnique({ where: { id } })
  if (!dog) return notFound('Dog not found')
  return ok(dog)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    if (!Number.isInteger(id)) return badRequest('Invalid id')
    const json = await req.json()
    const body = dogUpdateSchema.parse(json)

    const dog = await prisma.dog.update({ where: { id }, data: body })
    return ok(dog)
  } catch (err: any) {
    if (err?.name === 'ZodError') return badRequest('Invalid body', err)
    if (err?.code === 'P2025') return notFound('Dog not found')
    return serverError(err)
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    if (!Number.isInteger(id)) return badRequest('Invalid id')
    await prisma.dog.delete({ where: { id } })
    return ok({ deleted: true })
  } catch (err: any) {
    if (err?.code === 'P2025') return notFound('Dog not found')
    return serverError(err)
  }
}
