export class NotFoundPetError extends Error {
  constructor() {
    super('Could not find pet.')
  }
}
