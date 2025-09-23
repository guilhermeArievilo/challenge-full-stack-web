export default class RequiredFieldError extends Error {
  constructor(field: string) {
    super(`${field} is required`);
  }
}