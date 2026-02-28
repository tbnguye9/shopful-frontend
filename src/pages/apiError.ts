// src/pages/apiError.ts
export class ApiError extends Error {
  public readonly userMessage: string;

  constructor(userMessage: string, systemMessage?: string) {
    super(systemMessage ?? "API error"); // Create a general error we can add to.
    this.userMessage = userMessage; // Add to the base error message
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
