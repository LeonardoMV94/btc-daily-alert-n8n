import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class TooManyRequestsException extends HttpException {
  constructor(message = 'Too many requests') {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}

/**
 * Maneja respuestas de error de la API de Resend.
 * Lanza una excepción NestJS correspondiente al código HTTP recibido.
 *
 * @param status Código de estado HTTP recibido de Resend
 * @param data Cuerpo de la respuesta de error (opcional)
 */
export function handleResendResponse(status: number, data?: any): never {
  const message = data?.message || 'Error al enviar el correo.';

  switch (status) {
    case 400:
      throw new BadRequestException(message || 'Parámetros inválidos.');
    case 401:
      throw new UnauthorizedException(message || 'API key faltante.');
    case 403:
      throw new ForbiddenException(message || 'API key inválida.');
    case 404:
      throw new NotFoundException(message || 'Recurso no encontrado.');
    case 429:
      throw new TooManyRequestsException(
        (message as string) || 'Límite de peticiones excedido.',
      );
    default:
      // Aplica para 5xx u otros errores inesperados
      throw new InternalServerErrorException(
        message || 'Error del servidor de Resend.',
      );
  }
}
