import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-breed',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './breed.component.html',
  styleUrl: './breed.component.css'
})
export class BreedComponent {

  breedName: string | null = null;
  breedImages: string[] = [];
  subBreeds: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.breedName = params.get('breedName');
      if (this.breedName) {
        this.fetchBreedImages();
      }
    });
    this.fetchSubBreeds();
  }

  fetchSubBreeds() {
    if (this.breedName) {
      this.http.get<any>(`https://dog.ceo/api/breed/${this.breedName}/list`)
        .subscribe(
          response => {
            this.subBreeds = response.message;
            console.log(this.subBreeds);
          },
          error => {
            console.error('Error fetching sub-breeds:', error);
          }
        );
    }
  }

  fetchBreedImages() {
    if (this.breedName) {
      this.http.get<any>(`https://dog.ceo/api/breed/${this.breedName}/images/random/1`)
        .subscribe(
          response => {
            this.breedImages = response.message;
          },
          error => {
            console.error('Error fetching breed images:', error);
          }
        );
    }
  }

}
