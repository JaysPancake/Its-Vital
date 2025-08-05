import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  protected readonly joinCode = signal('');

  constructor(private sessions: SessionService, private router: Router) {}

  protected createSession(): void {
    const code = this.sessions.createSession();
    this.router.navigate(['/control', code]);
  }

  protected joinSession(): void {
    const code = this.joinCode().trim();
    if (this.sessions.getSession(code)) {
      this.router.navigate(['/session', code]);
    } else {
      alert('Session not found');
    }
  }
}
