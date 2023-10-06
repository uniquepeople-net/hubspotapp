import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  name: string = '';
  price: number = 0;
  updateProduct:any;
  constructor(private router: Router, private productService: ProductService) { }
  
  ngOnInit(){
    let currentRoute = this.router.url;
    let parts = currentRoute.split('/');
    let lastPart = parts[parts.length - 1];
    if(lastPart !== 'new'){
    this.updateProduct = this.productService.updateProduct;
    console.log( this.productService.updateProduct);
    if(this.updateProduct){
      this.name = this.updateProduct.properties.name;
      this.price = this.updateProduct.properties.price;
    }
  }
  }
  
  saveData(){
    //get route path
    let productIdorNew;
    const currentRoute = this.router.url;
    const parts = currentRoute.split('/');
    const lastPart = parts[parts.length - 1];

    if (lastPart === 'new') {
      productIdorNew = 'new';
    } else {
      productIdorNew = +this.updateProduct.id;
    }
    
    //call service and send data
    this.productService.saveProduct(productIdorNew, {name: this.name, price: this.price}).subscribe(
      () => {
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }
}
