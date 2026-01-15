import type { LocaleStorage } from "./storage-interface"

/**
 * LocalStorage adapter
 * Implements LocaleStorage interface following Dependency Inversion Principle
 */
export class LocalStorageAdapter implements LocaleStorage {
  get(key: string): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(key)
  }

  set(key: string, value: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(key, value)
  }
}

/**
 * Singleton instance
 */
export const localStorageAdapter = new LocalStorageAdapter()
