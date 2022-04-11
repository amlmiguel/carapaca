import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IProductColor } from '../shared/models/productColor';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  colors: IProductColor[];
  brandIdSelected: number = 0;
  typeIdSelected: number = 0;
  colorIdSelected: number;
  shopParams = new ShopParams();
  totalCount: number;
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
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
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
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts;
  }

  onColorSelected(colorId: number) {
    this.shopParams.colorId = colorId;
    this.shopParams.pageNumber = 1;
    this.getProducts;
  }

  onSortSelected(sort: string)
  {
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.getProducts();

  }

  onPageChanged(event: any) {
    if(this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }

  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
