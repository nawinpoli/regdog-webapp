import { z } from 'zod'

export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).default(20).optional(),
})

export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
}).refine((d: { email?: string; password?: string }) => d.email !== undefined || d.password !== undefined, {
  message: 'At least one field is required',
})

export const dogCreateSchema = z.object({
  userId: z.number().int(),
  name: z.string().min(1),
  gender: z.enum(['MALE', 'FEMALE', 'UNKNOWN']),
  breed: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  microchipNumber: z.string().optional(),
  pedigreeFileUrl: z.string().url().optional(),
  chronicDiseases: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  ownerName: z.string().optional(),
  ownerPhone: z.string().optional(),
  ownerAddress: z.string().optional(),
  extraDescription: z.string().optional(),
  lostStatus: z.enum(['NORMAL', 'LOST', 'FOUND', 'UNKNOWN']).optional(),
})

export const dogUpdateSchema = dogCreateSchema.partial().refine((d: Record<string, unknown>) => Object.keys(d).length > 0, { message: 'No fields provided' })

export const eventTypeCreateSchema = z.object({
  code: z.string().min(1),
  nameTh: z.string().min(1),
  category: z.enum(['ACTIVITY', 'HEALTH', 'EXPENSE']),
})

export const eventTypeUpdateSchema = eventTypeCreateSchema.partial().refine((d: Record<string, unknown>) => Object.keys(d).length > 0, { message: 'No fields provided' })

export const dogEventCreateBase = z.object({
  dogId: z.number().int(),
  eventTypeId: z.number().int(),
  eventAt: z.coerce.date(),
  note: z.string().optional(),
  imageUrl: z.string().url().optional(),
})

export const dogEventDetailSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('WALK'), distanceKm: z.number().optional(), durationMin: z.number().int().optional(), location: z.string().optional() }),
  z.object({ type: z.literal('PLAY'), durationMin: z.number().int().optional(), toy: z.string().optional(), location: z.string().optional() }),
  z.object({ type: z.literal('TRAINING'), durationMin: z.number().int().optional(), skill: z.string().optional(), successLevel: z.number().int().min(1).max(5).optional() }),
  z.object({ type: z.literal('SYMPTOM'), symptom: z.string(), severity: z.number().int().optional(), sinceWhen: z.coerce.date().optional() }),
  z.object({ type: z.literal('VACCINE'), vaccineName: z.string(), dose: z.string().optional(), vetClinic: z.string().optional(), vetName: z.string().optional(), nextDueDate: z.coerce.date().optional() }),
  z.object({ type: z.literal('MEDICATION'), drugName: z.string(), dosageAmount: z.number().optional(), dosageUnit: z.string().optional(), frequency: z.string().optional(), startDate: z.coerce.date().optional(), endDate: z.coerce.date().optional() }),
  z.object({ type: z.literal('VET_VISIT'), reason: z.string().optional(), clinicName: z.string().optional(), vetName: z.string().optional(), cost: z.number().optional(), nextAppointment: z.coerce.date().optional() }),
  z.object({ type: z.literal('WEIGHT'), weightKg: z.number(), bodyScore: z.number().int().optional() }),
  z.object({ type: z.literal('EXPENSE'), amount: z.number(), currency: z.string().default('THB').optional(), category: z.string().optional(), paymentNote: z.string().optional() }),
])

export const dogEventCreateSchema = dogEventCreateBase.extend({
  detail: dogEventDetailSchema.optional(),
})
