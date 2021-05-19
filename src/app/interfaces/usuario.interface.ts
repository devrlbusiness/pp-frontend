export interface UsuarioI{
  _id?: string,
  nombre?: string,
  primer_apellido?: string,
  segundo_apellido?: string,
  correo: string,
  contrasena?: string,
  rol?: string,
  is_active?: boolean,
  exp?: number,
}