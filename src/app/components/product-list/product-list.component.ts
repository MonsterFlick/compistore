import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        console.log('Fetched products:', data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loading = false;
      }
    });
  }

  goToProduct(id: number) {
    this.router.navigate(['/view', id]);
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }
  
}
