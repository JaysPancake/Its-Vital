import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private sessions = new Map<string, WritableSignal<string>>();
  private readonly prefix = 'session-';

  constructor() {
    window.addEventListener('storage', ({ key, newValue }) => {
      if (!key?.startsWith(this.prefix)) return;
      const code = key.substring(this.prefix.length);
      const session = this.sessions.get(code);
      if (session && newValue !== null) {
        session.set(newValue);
      }
    });
  }

  createSession(): string {
    let code = this.generateCode();
    while (localStorage.getItem(this.storageKey(code))) {
      code = this.generateCode();
    }
    localStorage.setItem(this.storageKey(code), '');
    this.sessions.set(code, signal(''));
    return code;
  }

  getSession(code: string): WritableSignal<string> | undefined {
    if (this.sessions.has(code)) {
      return this.sessions.get(code);
    }
    const stored = localStorage.getItem(this.storageKey(code));
    if (stored !== null) {
      const s = signal(stored);
      this.sessions.set(code, s);
      return s;
    }
    return undefined;
  }

  updateSession(code: string, data: string): void {
    localStorage.setItem(this.storageKey(code), data);
    const session = this.getSession(code);
    session?.set(data);
  }

  private storageKey(code: string): string {
    return `${this.prefix}${code}`;
  }

  private generateCode(): string {
    // Generate a simple unique alphanumeric code
    return Math.random().toString(36).substring(2, 8);
  }
}
