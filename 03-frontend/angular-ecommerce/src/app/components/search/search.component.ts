import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private router: Router) {}
  onSearch(event: Event, searchKeyword: string) {
    event.preventDefault(); // Prevent default form submit behavior
    if (searchKeyword.trim()) {
      // If keyword is not empty, navigate to search
      this.router.navigateByUrl(`/search/${searchKeyword}`);
    } else {
      // If keyword is empty, reset to show all products
      this.router.navigateByUrl(`/products`);
    }
  }

  onSearchKeyup(searchKeyword: string) {
    if (!searchKeyword.trim()) {
      // If search keyword is empty, reset to show all products
      this.router.navigateByUrl(`/products`);
    }
  }
}
