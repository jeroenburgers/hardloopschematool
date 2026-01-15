/**
 * Router interface for navigation
 * Dependency Inversion Principle: High-level modules depend on abstractions
 */
export interface Router {
  push(path: string): void
  refresh(): void
}
