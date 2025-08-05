import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-session',
  imports: [MatCardModule],
  templateUrl: './session.html',
  styleUrl: './session.scss'
})
export class Session {
  protected readonly code: string;
  protected readonly message: WritableSignal<string>;

  constructor(private route: ActivatedRoute, private sessions: SessionService) {
    this.code = this.route.snapshot.paramMap.get('code')!;
    this.message = this.sessions.getSession(this.code) ?? signal('Session not found');
  }
}
