import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LazyLoadEvent } from 'primeng/api';
import { ScrollerModule } from 'primeng/scroller';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ScrollerModule, InputTextModule],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css',
  providers: [ApiService]
})
export class DogsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  breeds: string[] = [];
  searchItem: string = '';
  filteredBreeds: string[] = [];

  items: string[] = ['victor', 'vasile', 'roma'];
  lazyLoading: boolean = false;


  ngOnInit(): void {
    this.fetchAllBreeds();
    this.filteredBreeds = this.breeds;
  }

  onLazyLoad(event: LazyLoadEvent) {
    this.lazyLoading = true;

    setTimeout(() => {
      const { first, rows } = event;
      const start = first || 0;
      const end = (start + (rows || 10));

      for (let i = start; i < end; i++) {
        this.items.push(`Item #${i + 1}`);
      }

      this.lazyLoading = false;
    }, 100);
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

  onSearch(): void {
    const searchItemLower = this.searchItem.toLowerCase().trim();
    this.filteredBreeds = this.breeds.filter(breed =>
      breed.toLowerCase().startsWith(searchItemLower)
    );
  }

}
