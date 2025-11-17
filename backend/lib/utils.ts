/**
 * คำนวณอายุจากวันเกิด
 * @param birthDate - วันเกิดในรูปแบบ Date หรือ string
 * @returns อายุในรูปแบบ "X ปี Y เดือน" หรือ null ถ้าไม่มี birthDate
 */
export function calculateAge(birthDate: Date | string | null): string | null {
  if (!birthDate) return null

  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate
  const now = new Date()

  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()

  // ปรับค่าถ้าเดือนติดลบ
  if (months < 0) {
    years--
    months += 12
  }

  // ปรับค่าถ้าวันยังไม่ครบเดือน
  if (now.getDate() < birth.getDate()) {
    months--
    if (months < 0) {
      years--
      months += 12
    }
  }

  if (years === 0 && months === 0) {
    return 'น้อยกว่า 1 เดือน'
  } else if (years === 0) {
    return `${months} เดือน`
  } else if (months === 0) {
    return `${years} ปี`
  } else {
    return `${years} ปี ${months} เดือน`
  }
}
