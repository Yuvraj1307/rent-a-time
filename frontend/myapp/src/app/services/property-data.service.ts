import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class PropertyDataService {
url="https://rentatime.onrender.com/host/prop/property"
  constructor(private http:HttpClient) {
  }
  property(){
    return this.http.get<any>(this.url)
  }
}
