import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

 

  private backendUrl1 =`http://localhost:4500/user/login`
  private bacendUrl2=`http://localhost:4500/host/login`
  constructor(private http: HttpClient) {}

  Login(lgForm: any): Observable<any> {
    if(lgForm.host){
      return this.http.post<any>(this.bacendUrl2, lgForm);

    }else{

      return this.http.post<any>(this.backendUrl1, lgForm);
    }
  }
}
