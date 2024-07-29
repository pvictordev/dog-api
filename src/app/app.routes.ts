import { Routes } from '@angular/router';
import { BreedComponent } from './pages/breed/breed.component';
import { DogsComponent } from './pages/dogs/dogs.component';
import { SubBreedComponent } from './pages/sub-breed/sub-breed.component';

export const routes: Routes = [
  { path: '', component: DogsComponent },
  { path: 'breed', component: BreedComponent },
  { path: 'sub-breed', component: SubBreedComponent },
];
