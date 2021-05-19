import { ClienteI } from "./cliente.interface";

export interface AsuntoI{
  _id?: string,
  expediente: string,
  organo: string,
  tipo_asunto: string,
  tipo_servicio_asunto?: string,
  fecha_inicio: Date,
  estado_procesal: string,
  tramite_siguiente: string,
  observaciones?: string,
  cliente: ClienteI,
  is_active?: boolean,
}