import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getBreeds(): Observable<any> {
    return this.httpClient.get<any>('https://dog.ceo/api/breeds/list/all');
  }

  // getPartialBreeds(limit: number = 10): Observable<string[]> {
  //   return this.httpClient.get<any>('https://dog.ceo/api/breeds/list/all').pipe(
  //     map(response => {
  //       const allBreeds = Object.keys(response.message);
  //       return allBreeds.slice(0, limit);
  //     })
  //   );
  // }

  getBreedImage(breedName: string | null): Observable<any> {
    return this.httpClient.get<any>("https://dog.ceo/api/breed/" + breedName + "/images");
  }

  getSubBreeds(breedName: string | null) {
    return this.httpClient.get<any>("https://dog.ceo/api/breed/" + breedName + "/list");
  }

  getSubBreedImage(breedName: string | null, subBreedName: string | null) {
    return this.httpClient.get<any>("https://dog.ceo/api/breed/" + breedName + "/" + subBreedName + "/images");
  }
}
