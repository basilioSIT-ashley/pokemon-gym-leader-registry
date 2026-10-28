
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { LeaderList } from './pages/leader-list/leader-list';
import { LeaderForm } from './pages/leader-form/leader-form';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    title: 'Home | Gym Leader Registry'
  },
  {
    path: 'leaders',
    component: LeaderList,
    title: 'Gym Leaders | Gym Leader Registry'
  },
  {
    path: 'leaders/new',
    component: LeaderForm,
    title: 'Register Gym Leader | Gym Leader Registry'
  },
  {
    path: 'leaders/:id/edit',
    component: LeaderForm,
    title: 'Edit Gym Leader | Gym Leader Registry'
  },
  {
    path: '**',
    component: NotFound,
    title: 'Page Not Found'
  }
];
