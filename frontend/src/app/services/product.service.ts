import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  updateProduct: Product | null = null; 
  constructor(private http: HttpClient) { }
  
  private apiUrl = 'http://localhost/api/products'; // Replace with your API URL

  setUpdateProductToForm(product:Product){
    this.updateProduct = product;
  }
  
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  saveProduct(productIdorNew: string | number, productData: Product): Observable<any> {
    if(productIdorNew === 'new'){
      return this.http.post(`${this.apiUrl}/new`, productData);
    } else if(typeof productIdorNew === 'number') {
      return this.http.post(`${this.apiUrl}/${productIdorNew}`, productData);
    } else {
      throw new Error('Invalid productIdorNew value');
    }
  }
  searchProducts(params: any): Observable<any> {
    const apiUrl = 'http://localhost/api/products/search';

    return this.http.get(apiUrl, { params });
  }

}
