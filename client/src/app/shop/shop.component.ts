import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IProductColor } from '../shared/models/productColor';
import { IProductType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  colors: IProductColor[];
  brandIdSelected: number = 0;
  typeIdSelected: number = 0;
  colorIdSelected: number;
  sortSelected = 'name';
  sortOptions = [
    {name: 'Alfabética', value: 'name'},
    {name: 'Preço: Menor para o Maior', value: 'priceAsc'},
    {name: 'Preço: Maior para o Menor', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getColors();
    this.getTypes()

  }

  getProducts() {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.colorIdSelected, this.sortSelected).subscribe(response => {
      this.products = response.data;
    }, error => {
      console.log(error);
    });

  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'Todos'}, ...response];
    }, error =>{
      console.log(error);
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'Todos'}, ...response];
    }, error =>{
      console.log(error);
    })
  }

  getColors() {
    this.shopService.getColors().subscribe(response => {
      this.colors = [{id: 0, name: 'Todos'}, ...response];
    }, error =>{
      console.log(error);
    })
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts;
  }

  onColorSelected(colorId: number) {
    this.colorIdSelected = colorId;
    this.getProducts;
  }

  onSortSelected(sort: string)
  {
    this.sortSelected = sort;
    this.getProducts();

  }

}
