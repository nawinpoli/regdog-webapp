import { NextResponse } from 'next/server'
import { withCors } from './cors'

export function ok<T>(data: T, init?: number | ResponseInit) {
  return withCors(data as any, init as any)
}

export function badRequest(message: string, details?: unknown) {
  return withCors({ error: message, details }, { status: 400 })
}

export function notFound(message = 'Not found') {
  return withCors({ error: message }, { status: 404 })
}

export function serverError(err: unknown) {
  const msg = err instanceof Error ? err.message : 'Internal Server Error'
  return withCors({ error: msg }, { status: 500 })
}
