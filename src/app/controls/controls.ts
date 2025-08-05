import { Component, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-controls',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './controls.html',
  styleUrl: './controls.scss'
})
export class Controls {
  protected readonly code: string;
  protected readonly message: WritableSignal<string>;

  constructor(private route: ActivatedRoute, private sessions: SessionService) {
    this.code = this.route.snapshot.paramMap.get('code')!;
    this.message = this.sessions.getSession(this.code)!;
  }

  protected updateMessage(value: string): void {
    this.sessions.updateSession(this.code, value);
  }
}
