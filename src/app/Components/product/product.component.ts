import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductService } from "../../services/product/product.service";
import { CartService } from "../../services/cart/cart.service";
import { ItemService } from "../../services/item/item.service"
import { UsersService } from "../../services/users/users.service"
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ProductComponent implements OnInit {
  products: any = [];
  categorys: any = [];
  subcategorys: any = [];
  filter_categorys: any = [];
  filter_products: any = [];
  error_msg
  constructor(
    public ProductService: ProductService,
    public CartService: CartService,
    public ItemService: ItemService,
    public UserService: UsersService,
    public router: Router,
    public snackBar: MatSnackBar,
  ) {
    if (this.UserService.is_login === false) {
      this.router.navigate(['']);
    }
    this.UserService.is_login
    this.UserService.is_admin
  }

  ngOnInit(): void {
    this.ProductService.GET_Product().subscribe(result => {
      this.products = result.data
    });
    this.ProductService.GET_Category().subscribe(result => {
      this.categorys = result.data
    })
    this.ProductService.GET_Sub_Category().subscribe(result => {
      this.subcategorys = result.data
    })
  };
  Categorys(e): void {
    let ID = e.target.id
    const filter = this.categorys.filter(({ Sub_categoryId }) => Sub_categoryId === ID)
    if (ID = filter) {
      this.filter_categorys = filter
    }
  }
  onSearch(e) {
    let ID = e.target.id
    const filter = this.products.filter(({ CategoryId }) => CategoryId === ID)
    if (ID = filter) {
      this.filter_products = filter
    }
  }
  plus_one(p): void {
    const find = this.ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
    if (find) {
      find.Quantity++
      this.ItemService.NewItem(find)
      this.snackBar.open(`#${find.Name} - Is added to your cart`);
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 2000);

    } else {
      this.ItemService.transactions.push({
        ProductID: p._id,
        Name: p.Name,
        CategoryId: p.CategoryId,
        CategoryName: p.CategoryName,
        Img: p.ImagePath,
        Price: p.Price,
        Quantity: 1
      });
      const find = this.ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
      this.ItemService.NewItem(find)
      this.snackBar.open(`#${find.Name} - Is added to your cart`);
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 2000);
    }
  }
  minus_one(p): void {
    const find = this.ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
    if (find) {
      if (find.Quantity === 1 || find.Quantity === 0) {
        this.error_msg = 'It is not possible to have less than 1'
        setTimeout(() => {
          this.error_msg = ''
        }, 5000);
      } else {
        find.Quantity--
        this.ItemService.NewItem(find)
        this.snackBar.open(`#${find.Name} - Is removed from your cart`);
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 2000);
      }
    } else {
      this.ItemService.transactions.push({
        ProductID: p._id,
        Name: p.Name,
        CategoryId: p.CategoryId,
        CategoryName: p.CategoryName,
        Img: p.ImagePath,
        Price: p.Price,
        Quantity: 1
      });
      const find = this.ItemService.transactions.find(({ ProductID }) => ProductID === p._id)
      this.ItemService.NewItem(find)
      this.snackBar.open(`#${find.Name} - Is removed from your cart`);
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 2000);
    }
  }
}
