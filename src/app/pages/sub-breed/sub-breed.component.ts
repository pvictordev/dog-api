import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-breed',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './sub-breed.component.html',
  styleUrl: './sub-breed.component.css'
})
export class SubBreedComponent {
  breedName: string | null = null;
  subBreedName: string | null = null;
  subBreedImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.breedName = params.get('breedName');
      this.subBreedName = params.get('subBreedName');
      if (this.breedName && this.subBreedName) {
        this.fetchBreedImages();
      }
    });
  }

  fetchBreedImages() {
    if (this.subBreedName) {
      this.http.get<any>(`https://dog.ceo/api/breed/${this.breedName + "/" + this.subBreedName}/images/random/1`)
        .subscribe(
          response => {
            this.subBreedImages = response.message;
          },
          error => {
            console.error('Error fetching breed images:', error);
          }
        );
    }
  }
}
