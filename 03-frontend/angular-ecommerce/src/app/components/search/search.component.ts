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
    event.preventDefault();
    console.log(`value=${searchKeyword}`);
    this.router.navigateByUrl(`/search/${searchKeyword}`);
  }
}
