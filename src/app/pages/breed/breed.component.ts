import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-breed',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, CardModule, ButtonModule],
  templateUrl: './breed.component.html',
  styleUrl: './breed.component.css'
})


export class BreedComponent {

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  breedName: string | null = null;
  breedImage: string[] = [];
  subBreeds: string[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.breedName = params.get('breedName');
      if (this.breedName) {
        this.fetchBreedImage();
      }
    });
    this.fetchSubBreeds();
  }

  fetchBreedImage(): void {
    this.apiService.getBreedImage(this.breedName).subscribe({
      next: (data) => {
        this.breedImage = data.message[0];
      },
      error: (error) => {
        console.error("Error fetching dogs:", error);
      },
    });

  }

  fetchSubBreeds() {
    this.apiService.getSubBreeds(this.breedName).subscribe({
      next: (data) => {
        this.subBreeds = data.message;
      },
      error: (error) => {
        console.error("Error fetching dog sub-breed:", error);
      },
    });
  }
}

