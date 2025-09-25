export const emailRule = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value.trim()) || 'E-mail deve ser válido'
export const requiredRule = (value: string) => !!value || 'Campo obrigatório'
export const onlyNumbersRule = (value: string) => /^\d+$/.test(value) || 'Somente números'
export const cpfRule = (value: string) => {
  const digits = value.replace(/\D+/g, '')
  if (digits.length !== 11) return 'CPF deve ter 11 dígitos'

  if (/^(\d)\1{10}$/.test(digits)) return 'CPF inválido'

  const calcCheckDigit = (base: string) => {
    let sum = 0
    let weight = base.length + 1
    for (let i = 0; i < base.length; i++) {
      sum += Number(base[i]) * weight--
    }
    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }

  const d1 = calcCheckDigit(digits.slice(0, 9))
  const d2 = calcCheckDigit(digits.slice(0, 10))

  if (d1 !== Number(digits[9]) || d2 !== Number(digits[10])) {
    return 'CPF inválido'
  }

  return true
}
