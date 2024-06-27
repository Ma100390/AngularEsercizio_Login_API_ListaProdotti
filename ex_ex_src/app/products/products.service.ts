import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
//import { UserData } from '../logins/userdata';
import { AuthService } from '../auth/auth.service';
 
interface ProductDTO {
  id: number;
  title: string;
  price: number;
  image: string;
}

// interface UserDatatDTO {
//   name:string;
//   avatar:string;
// }

// interface UserDatatDTO {
//   id:number;
//   email:string;
//   name:{
//       firstname:string;
//       lastname:string;
//   };
//   phone:string;
// }

@Injectable({
  providedIn: 'root'
})
export class ProdcutsService {
  //https://fakeapi.platzi.com/en/rest/products
  //https://fakestoreapi.com/docs

  private productsUrl = "https://fakestoreapi.com/products";
  //private loginUrl = "https://api.escuelajs.co/api/v1/auth/login";
  // private loginUrl = "https://fakestoreapi.com/auth/login";
  // //private userDataUrl = "https://api.escuelajs.co/api/v1/auth/profile";
  // private userDataUrl = "https://fakestoreapi.com/users/1"
  // private jwtToken:string = "";

  constructor(private http:HttpClient, private authService:AuthService) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductDTO[]>(this.productsUrl, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getJwtToken()})
    }).pipe(
      map(products => products.map(product => {
        return this.getProductFromProductDTO(product);
      }))
    )
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<ProductDTO>(this.productsUrl + "/" + id, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getJwtToken()})
    }).pipe(
      map(product => {
        return this.getProductFromProductDTO(product);
      })
    )
  }

  private getProductFromProductDTO(productDTO: ProductDTO):Product {
    return {
      id: productDTO.id,
      name: productDTO.title,
      price: productDTO.price,
      image: productDTO.image
    };
  }


  // login(uname:string, password:string): Observable<{token:string}> {
  //   return this.http.post<{token:string}>(this.loginUrl, {
  //     // email: "john@mail.com",
  //     // password: "changeme"
  //     username: "johnd",
  //     password: "m38rmF$"
  //   }).pipe(
  //     tap((jwtTokenObject:{token:string}) => {
  //       this.jwtToken = jwtTokenObject.token;
  //       //localStorage.setItem("token", jwtTokenObject.token);
  //     })
  //   );
  // }

  // logout()
  // {
  //   this.jwtToken = "";
  // }

  // getUserData() {
  //   return this.http.get<UserDatatDTO>(this.userDataUrl, {
  //     headers: new HttpHeaders({'Authorization': 'Bearer ' + this.jwtToken})
  //   }).pipe(
  //     map(userData => {
  //       return this.getUserDataFromUserDatatDTO(userData);
  //     })
  //   );
  // }

  // private getUserDataFromUserDatatDTO(userDataDTO: UserDatatDTO):UserData {
  //   return {
  //     userName: userDataDTO.name.firstname,
  //     userLastname: userDataDTO.name.lastname,
  //     //userAvatar: userDataDTO.avatar,
  //   };
  // }
}