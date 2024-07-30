import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAllBreeds(): Observable<any> {
    return this.httpClient.get<any>('https://dog.ceo/api/breeds/list/all');
  }

  getBreedImage(breedName: string | null): Observable<any> {
    return this.httpClient.get<any>("https://dog.ceo/api/breed/" + breedName + "/images");
  }

  getSubBreeds(breedName: string | null) {
    return this.httpClient.get<any>("https://dog.ceo/api/breed/" + breedName + "/list");
  }

  getSubBreedImage() {

  }
}
