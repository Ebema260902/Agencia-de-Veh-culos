export type Fuel = 'Gasolina' | 'Diésel' | 'Eléctrico' | 'Híbrido'
export type VehicleBadge = 'Nuevo' | 'Eléctrico' | 'Híbrido'

export interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  transmission: string
  fuel: Fuel
  badge?: VehicleBadge
  image?: string
}

export interface ContactFormData {
  name: string
  contact: string
  reason: string
  message: string
}
