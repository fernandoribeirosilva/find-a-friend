export class NotFoundOrganizationError extends Error {
  constructor() {
    super('Could not find organization.')
  }
}
