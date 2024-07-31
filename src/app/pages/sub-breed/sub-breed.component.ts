import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sub-breed',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule],
  templateUrl: './sub-breed.component.html',
  styleUrl: './sub-breed.component.css'
})
export class SubBreedComponent {
  breedName: string | null = null;
  subBreedName: string | null = null;
  subBreedImage: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.breedName = params.get('breedName');
      this.subBreedName = params.get('subBreedName');
      if (this.breedName && this.subBreedName) {
        this.fetchSubBreedImage();
      }
    });
  }

  fetchSubBreedImage() {

    this.apiService.getSubBreedImage(this.breedName, this.subBreedName).subscribe({
      next: (data) => {
        this.subBreedImage = data.message[1];
      },
      error: (error) => {
        console.error("Error fetching sub Breed:", error);
      },
    });
  }
}
