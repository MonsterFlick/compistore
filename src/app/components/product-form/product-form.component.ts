import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  product: Product = {
    sku: '',
    name: '',
    price: 0,
    images: []
  };

  imageInput = '';

  constructor(
    private productService: ProductService,
    public router: Router

  ) {}

  addProduct() {
    this.product.images = this.imageInput
      .split(',')
      .map(url => url.trim())
      .filter(url => url);

    this.productService.create(this.product).subscribe({
      next: () => {
        alert('Product added!');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Create error:', err)
    });
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }
}
