import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css',
  providers: [ApiService]
})
export class DogsComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  breeds: string[] = [];

  ngOnInit(): void {
    this.fetchAllBreeds();
  }

  fetchAllBreeds() {
    this.apiService.getAllBreeds().subscribe({
      next: (data) => {
        this.breeds = Object.keys(data.message);
        console.log(this.breeds);
      },
      error: (error) => {
        console.error("Error fetching dogs:", error);
      },
    });
  }

}
