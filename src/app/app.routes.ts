import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Controls } from './controls/controls';
import { Session } from './session/session';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'control/:code', component: Controls },
  { path: 'session/:code', component: Session },
  { path: '**', redirectTo: '' }
];
