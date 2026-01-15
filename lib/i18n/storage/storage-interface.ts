/**
 * Storage interface for locale persistence
 * Dependency Inversion Principle: High-level modules depend on abstractions
 */
export interface LocaleStorage {
  get(key: string): string | null
  set(key: string, value: string): void
}
