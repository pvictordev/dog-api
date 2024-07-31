import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css',
  providers: [ApiService]
})
export class DogsComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  breeds: string[] = [];
  searchItem: string = '';
  filteredBreeds: string[] = [];

  ngOnInit(): void {
    this.fetchAllBreeds();
    // this.fetchPartialBreeds();
    this.filteredBreeds = this.breeds;
  }

  fetchAllBreeds(): void {
    this.apiService.getBreeds().subscribe({
      next: (data) => {
        this.breeds = Object.keys(data.message);
      },
      error: (error) => {
        console.error("Error fetching dogs:", error);
      },
    });
  }

  // fetchPartialBreeds(): void {
  //   this.apiService.getPartialBreeds(10).subscribe({
  //     next: (data) => {
  //       console.log(data)
  //       this.breeds = data;
  //     },
  //     error: (error) => {
  //       console.error("Error fetching dogs:", error);
  //     },
  //   });
  // }

  onSearch(): void {
    const searchItemLower = this.searchItem.toLowerCase().trim();
    this.filteredBreeds = this.breeds.filter(breed =>
      breed.toLowerCase().startsWith(searchItemLower)
    );
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

}
