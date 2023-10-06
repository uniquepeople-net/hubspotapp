import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: any[] = [];
  popUpShow: boolean = false;
  idToDelete: number | null = null;
  name: string = '';
  price: number | null = null;
  id: number | null = null;
  constructor(private productService: ProductService, private router: Router) {}


  ngOnInit(){
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  showDeletePopUp(id: number){
    this.idToDelete = id;
    this.popUpShow = true;
  }
  clsoeDeletePopUp(){
    this.idToDelete = null;
    this.popUpShow = false;
  }

  deleteProduct() {
    if(this.idToDelete){
    this.productService.deleteProduct(this.idToDelete).subscribe(
      () => {
        // Handle success, e.g., update the UI
        const index = this.products.findIndex((product) => product.id === this.idToDelete);
         // Check if the product with the given id exists
        if (index !== -1) {
        // Remove the product from the array
          this.products.splice(index, 1);
        }
        this.clsoeDeletePopUp();
      },
      (error) => {
        console.error('Error deleting product', error);
        // Handle error, e.g., show an error message
      }
    );

    }
  }
  openUpdateForm(productId: number){
    let productForUpdate = this.products.filter(item => item.id === productId);
    this.productService.setUpdateProductToForm(productForUpdate[0]);
    this.router.navigate(['/admin/products/edit']);
  }

  searchProducts() {
    // Create an object with the query parameters based on input values
    const params: any = {};

    if (this.name !== '') {
      params.name = this.name;
    }

    if (this.price !== null) {
      params.price = this.price;
    }

    if (this.id !== null) {
      params.id = this.id;
    }

    // Call the searchProducts method in your ProductService with the params object
    this.productService.searchProducts(params).subscribe((data) => {
      // Handle the API response data here
      this.products = data;
    });
  }
}
