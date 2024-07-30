import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [RouterModule, CommonModule],
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

  fetchAllBreeds(): void {
    this.apiService.getAllBreeds().subscribe({
      next: (data) => {
        this.breeds = Object.keys(data.message);
      },
      error: (error) => {
        console.error("Error fetching dogs:", error);
      },
    });
  }

}
