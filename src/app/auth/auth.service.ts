import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../logins/userdata';

interface UserDatatDTO {
  id:number;
  email:string;
  name:{
      firstname:string;
      lastname:string;
  };
  phone:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://angular.io/cli/serve
  //https://www.angularjswiki.com/angular/how-to-configure-ssl-locally-in-angular/
  //https://github.com/FiloSottile/mkcert#installation
  private loginUrl = "https://fakestoreapi.com/auth/login";
  //private userDataUrl = "https://api.escuelajs.co/api/v1/auth/profile";
  private userDataUrl = "https://fakestoreapi.com/users/1"
  private jwtToken:string = "";

  constructor(private http:HttpClient) { }

  getJwtToken():string 
  {
    return this.jwtToken;
  }

  login(uname:string, password:string): Observable<{token:string}> {
    return this.http.post<{token:string}>(this.loginUrl, {
      // email: "john@mail.com",
      // password: "changeme"
      // username: uname,
      // password: password
      username: "johnd",
      password: "m38rmF$"
    }).pipe(
      tap((jwtTokenObject:{token:string}) => {
        this.jwtToken = jwtTokenObject.token;
        console.log(jwtTokenObject.token)
        //localStorage.setItem("token", jwtTokenObject.token);
      })
    );
  }

  logout()
  {
    this.jwtToken = "";
  }

  getUserData() {
    return this.http.get<UserDatatDTO>(this.userDataUrl, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.jwtToken})
    }).pipe(
      map(userData => {
        return this.getUserDataFromUserDatatDTO(userData);
      })
    );
  }

  private getUserDataFromUserDatatDTO(userDataDTO: UserDatatDTO):UserData {
    return {
      userName: userDataDTO.name.firstname,
      userLastname: userDataDTO.name.lastname,
      //userAvatar: userDataDTO.avatar,
    };
  }
}
