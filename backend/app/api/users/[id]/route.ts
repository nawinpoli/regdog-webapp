import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, badRequest, notFound, serverError } from '@/lib/http'
import { userUpdateSchema } from '@/lib/validators'
import bcrypt from 'bcryptjs'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = Number(idStr)
  if (!Number.isInteger(id)) return badRequest('Invalid id')
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, createdAt: true, updatedAt: true } })
  if (!user) return notFound('User not found')
  return ok(user)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    if (!Number.isInteger(id)) return badRequest('Invalid id')
    const json = await req.json()
    const body = userUpdateSchema.parse(json)

    const data: any = {}
    if (body.email) data.email = body.email
    if (body.password) data.passwordHash = await bcrypt.hash(body.password, 10)

    const updated = await prisma.user.update({ where: { id }, data, select: { id: true, email: true, createdAt: true, updatedAt: true } })
    return ok(updated)
  } catch (err: any) {
    if (err?.name === 'ZodError') return badRequest('Invalid body', err)
    if (err?.code === 'P2025') return notFound('User not found')
    if (err?.code === 'P2002') return badRequest('Email already exists')
    return serverError(err)
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    if (!Number.isInteger(id)) return badRequest('Invalid id')
    await prisma.user.delete({ where: { id } })
    return ok({ deleted: true })
  } catch (err: any) {
    if (err?.code === 'P2025') return notFound('User not found')
    return serverError(err)
  }
}
