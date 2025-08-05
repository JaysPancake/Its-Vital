import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private sessions = new Map<string, WritableSignal<string>>();

  createSession(): string {
    let code = this.generateCode();
    while (this.sessions.has(code)) {
      code = this.generateCode();
    }
    this.sessions.set(code, signal(''));
    return code;
  }

  getSession(code: string): WritableSignal<string> | undefined {
    return this.sessions.get(code);
  }

  updateSession(code: string, data: string): void {
    const session = this.sessions.get(code);
    if (session) {
      session.set(data);
    }
  }

  private generateCode(): string {
    // Generate a simple unique alphanumeric code
    return Math.random().toString(36).substring(2, 8);
  }
}
