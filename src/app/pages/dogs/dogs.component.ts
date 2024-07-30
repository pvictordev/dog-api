import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css',
})
export class DogsComponent {
  constructor(private httpClient: HttpClient) { }
  breeds: string[] = [];

  ngOnInit() {
    this.getDogs();
  }

  getDogs() {
    this.httpClient
      .get('https://dog.ceo/api/breeds/list/all')
      .subscribe((response: any) => {
        this.breeds = Object.keys(response.message);
        console.log(this.breeds);
      });
  }

}
