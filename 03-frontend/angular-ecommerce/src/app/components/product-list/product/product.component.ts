import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIcon],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) price!: string;
  // @Input({ required: true }) image!: string;
}
