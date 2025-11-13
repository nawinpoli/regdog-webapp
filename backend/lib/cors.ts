import { NextResponse } from 'next/server'

const allowedOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:3000'

export function withCors<T>(data: T, init?: number | ResponseInit) {
  const res = NextResponse.json(data as any, init as any)
  res.headers.set('Access-Control-Allow-Origin', allowedOrigin)
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.headers.set('Access-Control-Max-Age', '86400')
  return res
}

export function preflight() {
  const res = new NextResponse(null, { status: 204 })
  res.headers.set('Access-Control-Allow-Origin', allowedOrigin)
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.headers.set('Access-Control-Max-Age', '86400')
  return res
}
