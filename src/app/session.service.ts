import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private sessions = new Map<string, WritableSignal<string>>();
  private readonly prefix = 'session:';

  createSession(): string {
    let code = this.generateCode();
    while (this.sessions.has(code) || this.hasStoredSession(code)) {
      code = this.generateCode();
    }
    const sig = signal('');
    this.sessions.set(code, sig);
    this.storeSession(code, '');
    this.listenToStorage(code, sig);
    return code;
  }

  getSession(code: string): WritableSignal<string> | undefined {
    let session = this.sessions.get(code);
    if (!session) {
      const stored = this.getStoredSession(code);
      if (stored === null) {
        return undefined;
      }
      session = signal(stored);
      this.sessions.set(code, session);
      this.listenToStorage(code, session);
    }
    return session;
  }

  updateSession(code: string, data: string): void {
    const session = this.getSession(code);
    if (session) {
      session.set(data);
      this.storeSession(code, data);
    }
  }

  private generateCode(): string {
    // Generate a simple unique alphanumeric code
    return Math.random().toString(36).substring(2, 8);
  }

  private storageKey(code: string): string {
    return `${this.prefix}${code}`;
  }

  private storeSession(code: string, data: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey(code), data);
    }
  }

  private getStoredSession(code: string): string | null {
    return typeof localStorage !== 'undefined'
      ? localStorage.getItem(this.storageKey(code))
      : null;
  }

  private hasStoredSession(code: string): boolean {
    return this.getStoredSession(code) !== null;
  }

  private listenToStorage(code: string, session: WritableSignal<string>): void {
    if (typeof window === 'undefined') {
      return;
    }
    const key = this.storageKey(code);
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        session.set(e.newValue);
      }
    });
  }
}
