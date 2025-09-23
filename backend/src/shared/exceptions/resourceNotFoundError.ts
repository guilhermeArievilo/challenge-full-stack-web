export default class ResourceNotFoundError extends Error {
  constructor(resource?: string) {
    super(`${resource} not found`);
    
    if (!resource) {
      super("Resource not found");
    }
  }
}