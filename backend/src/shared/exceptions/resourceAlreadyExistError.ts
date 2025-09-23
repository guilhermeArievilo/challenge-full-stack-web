export class ResourceAlreadyExistError extends Error {
  constructor(resource?: string) {
    super(`${resource} already exists`);
    
    if (!resource) {
      super("Resource already exists");
    }
  }
}