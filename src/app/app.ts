import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Its-Vital');
  protected readonly theme = signal<'light' | 'dark'>(this.getStoredTheme());

  constructor(private snackBar: MatSnackBar) {
    this.applyTheme(this.theme());
  }

  protected toggleTheme(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    const current = this.theme();
    localStorage.setItem('theme', current);
    this.applyTheme(current);
  }

  protected async sharePage(): Promise<void> {
    const url = window.location.href;
    const data = { title: this.title(), url };

    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        // User cancelled share; no action needed
      }
    } else {
      await navigator.clipboard.writeText(url);
      this.snackBar.open('Link copied to clipboard', 'Dismiss', {
        duration: 3000
      });
    }
  }

  private getStoredTheme(): 'light' | 'dark' {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }
}
