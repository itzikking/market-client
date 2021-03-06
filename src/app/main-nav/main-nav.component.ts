import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, timeout } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../services/product/product.service';
import { OrderService } from '../services/order/order.service';
import { UsersService } from '../services/users/users.service';
import { Router } from '@angular/router';
import { ItemService } from '../services/item/item.service';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  styles: [`:root {--visibility: visible;}`]
})

export class MainNavComponent {
  citys = [
    { name: 'Jerusalem', option: 'Jerusalem', number: 1 },
    { name: 'Tel-Aviv', option: 'Tel-Aviv', number: 2 },
    { name: 'Haifa', option: 'Haifa', number: 3 },
    { name: 'Rishon Lezion', option: 'Rishon Lezion', number: 4 },
    { name: 'Petah Tiqwa', option: 'Petah Tiqwa', number: 5 },
    { name: 'Ashdod', option: 'Ashdod', number: 6 },
    { name: 'Netanya', option: 'Netanya', number: 7 },
    { name: 'Beersheba the South', option: 'Beersheba the South', number: 8 },
    { name: 'Holon', option: 'Holon', number: 9 },
    { name: 'Bnei Brak', option: 'Bnei Brak', number: 10 },
  ];
  USERNAME
  token
  msg
  error_msg
  register_msg
  register_success
  somtingMissing
  order: OrderService[] = [];
  product: ProductService[] = [];
  users: UsersService[] = [];
  singup_form_1: FormGroup;
  singup_form_2: FormGroup;
  login_form: FormGroup;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  username
  password
  username_key_up
  username_key_up_error
  email_key_up
  email_key_up_error
  id_key_up
  id_key_up_error
  constructor(
    public breakpointObserver: BreakpointObserver,
    public OrderService: OrderService,
    public ProductService: ProductService,
    public UserService: UsersService,
    public formBuilder: FormBuilder,
    public router: Router,
    public ItemService: ItemService,
  ) {
    this.UserService.is_login
    this.UserService.is_admin
  }

  ngOnInit() {
    this.login_form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', ([Validators.required, Validators.minLength(8)])],
    });
    this.singup_form_1 = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', ([Validators.required, Validators.minLength(8)])],
      ConfirmPassword: ['', ([Validators.required, Validators.minLength(8)])],
      Email: ['', [Validators.required, Validators.email]],
      ID: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]]
    });
    this.singup_form_2 = this.formBuilder.group({
      Citys: [this.citys, Validators.required],
      Street: ['', Validators.required],
      Name: ['', Validators.required],
      LastName: ['', Validators.required],
    });
  };

  On_Connect(): void {
    this.username = this.login_form.value.username;
    this.password = this.login_form.value.password;
    if (this.username === undefined || this.password === undefined) {
      this.error_msg = 'somting is missing'
      setTimeout(() => {
        this.error_msg = undefined
      }, 2000);
    } else {
      try {
        this.UserService.POST_User_LOGIN(this.username, this.password).pipe().subscribe({
          next: (res) => {
            this.token = res.access
            this.USERNAME = res.UserName
            localStorage.setItem("AC::profile", this.token);
            this.UserService.is_admin = res.is_admin
            this.UserService.POST_TOKEN();
          },
          error: (error) => {
            this.error_msg = error.error.msg;
            setTimeout(() => {
              this.error_msg = null
            }, 2000);
          },
          complete: () => {
            this.msg = 'Welcome'
            if (this.UserService.profile !== null) {
              this.UserService.is_login = true
              this.USERNAME
            }
          }
        })
      } catch (err) { console.log(err); this.msg = err }
    }
  };
  sidenav_close(e) {
    console.log(e)
  }


  sing_out() {
    if (localStorage.getItem("AC::profile") !== null) {
      localStorage.removeItem("AC::profile");
      this.router.navigate(['']);
      this.UserService.is_login = false
      this.UserService.is_admin = false
      this.login_form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', ([Validators.required, Validators.minLength(8)])],
      });
      this.msg = null;
    }
  }
  UsernameKeyUp() {
    this.UserService.POST_test_1({ username: this.singup_form_1.value.Username })
      .subscribe(res => { this.username_key_up = res.msg }, err => {
        this.username_key_up_error = err.error.msg
        setTimeout(() => {
          this.username_key_up_error = null
        }, 3000);
      })
  }
  EmailKeyUP() {
    this.UserService.POST_test_1({ email: this.singup_form_1.value.Email })
      .subscribe(res => { this.email_key_up = res.msg }, err => {
        this.email_key_up_error = err.error.msg
        setTimeout(() => {
          this.email_key_up_error = null
        }, 3000);
      })
  }
  IDKeyUP() {
    this.UserService.POST_test_1({ id: this.singup_form_1.value.ID })
      .subscribe(res => { this.id_key_up = res.msg }, err => {
        this.id_key_up_error = err.error.msg
        setTimeout(() => {
          this.id_key_up_error = null
        }, 3000);
      })
  }
  On_Send_1(): void {
    const Username = this.singup_form_1.value.Username;
    const Password = this.singup_form_1.value.Password;
    if (Username === "" || Password === "") {
      this.somtingMissing = 'Somting is missing'
      setTimeout(() => {
        this.somtingMissing = null
      }, 2000);
    }
  };

  On_Send_2(): void {
    const value2 = this.singup_form_2.value;
    const value1 = this.singup_form_1.value;
    const City = value2.Citys
    const Street = value2.Street;
    const Name = value2.Name;
    const LastName = value2.LastName;
    const Username = value1.Username;
    const Password = value1.Password;
    const ConfirmPassword = value1.ConfirmPassword;
    const Email = value1.Email;
    const ID_Card = value1.ID;
    let Send_2 = [City, Street, Name, LastName, Email, ID_Card, Username, Password, ConfirmPassword];
    this.UserService.POST_New_User(Send_2).subscribe(
      res => {
        this.register_success = res.success
        this.token = res.access
        this.USERNAME = res.UserName
        localStorage.setItem("AC::profile", this.token);
        this.UserService.profile
        this.UserService.is_login = true;
        this.msg = 'Welcome';
        this.USERNAME;
        this.router.navigate(['/product']);
        this.ngOnInit();
      }, err => {
        this.register_msg = err.error.text;
        setTimeout(() => {
          this.register_msg = '';
        }, 5000);
      }
    )
  };


}
