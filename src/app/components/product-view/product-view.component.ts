import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html'
})
export class ProductViewComponent implements OnInit {
  product: Product = { sku: '', name: '', price: 0, images: [] };
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Invalid ID';
      return;
    }

    this.productService.get(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Product not found';
        this.loading = false;
        console.error(err);
      }
    });
  }

  saveProduct() {
    if (!this.product.id) return;
    this.productService.update(this.product.id, this.product).subscribe({
      next: () => alert('Product updated!'),
      error: (err) => console.error('Update error:', err)
    });
  }
  addImageField() {
    this.product.images.push('');
  }

  goBack() {
    this.router.navigate(['/']);
  }
  
  
  removeImage(index: number) {
    this.product.images.splice(index, 1);
  }

selectedImage: string | null = null;

openPreview(url: string) {
  this.selectedImage = url;
}

closePreview() {
  this.selectedImage = null;
}

  

  deleteProduct() {
    if (!this.product.id) return;
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.product.id).subscribe({
      next: () => {
        alert('Deleted');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Delete error:', err)
    });
  }
}
