export class NotFoundError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError"
    this.statusCode = 404
  }
}

export class ForbiddenError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError"
    this.statusCode = 403
  }
}