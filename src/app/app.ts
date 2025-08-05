import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Its-Vital');
  protected readonly theme = signal<'light' | 'dark'>(this.getStoredTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  protected toggleTheme(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    const current = this.theme();
    localStorage.setItem('theme', current);
    this.applyTheme(current);
  }

  private getStoredTheme(): 'light' | 'dark' {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }
}
