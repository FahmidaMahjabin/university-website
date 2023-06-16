export class ApiError extends Error {
  statusCode: number
  constructor(buuu: number, message: string | undefined, stack = ' ') {
    super(message)
    this.statusCode = buuu
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
