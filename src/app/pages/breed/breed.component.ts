import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-breed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breed.component.html',
  styleUrl: './breed.component.css'
})
export class BreedComponent {

  breedName: string | null = null;
  breedImage: string[] = [];
  subBreeds: string[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

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

