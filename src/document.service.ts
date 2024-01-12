import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): any {
   debugger;
    let key = localStorage.getItem("eviaSign-falcon-key");
    debugger
    const formData: FormData = new FormData();
    formData.append('UploadFiles', file, file.name);

  

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.append('Access-Control-Allow-Headers', 'origin,X-Requested-With,content-type,accept');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization','Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRSZWZJZCI6IjZjODM1ZDFmLWViYTAtNDAwYS04MjNhLTZjZjQ3NDMyZTlmYiIsInRlbmFudElkIjoiMTMzNCIsImVtYWlsIjoia2FzcHJvZHVjdDEyMysxMjNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJrYXNwcm9kdWN0MTIzKzEyM0BnbWFpbC5jb20iLCJ1c2VySWQiOiIzMTA0IiwidXNlclJlZklkIjoiMmNhNDk0ZTgtZTc1ZS00YWFiLWIxMWItMTFlNzVlNjYzN2Y1IiwiZmlyc3ROYW1lIjoia2FzcHJvZHVjdDEyMysxMjMiLCJsYXN0TmFtZSI6Imthc3Byb2R1Y3QxMjMrMTIzIiwidW5pcXVlSWRlbnRpZmllciI6IjYyYjlmNzJiLTZlZjUtNDQzYS1iNDFjLWQ2NGJjNjAxZDFiYSIsImFwcGxpY2F0aW9uQ2xhaW1zIjpbIlNpZ24uU2lnbmVyIiwiRmFsY29uLlJlYWRBbGwiLCJMaWNlbnNpbmciXSwic2NvcGVzIjpbIlNpZ24iLCJGYWxjb24iLCJMaWNlbnNpbmciXSwibmJmIjoxNjk3NDQ0MjM3LCJleHAiOjE2OTgwNDkwMzcsImlhdCI6MTY5NzQ0NDIzNywiaXNzIjoiRmFsY29uIiwiYXVkIjoiRXZpYSJ9.hLCjiSq-QsUYa7_GqoCQwHrQH2LgMFE8WEtbJNK1b-YLGXnqNg0P0xtHQjtiSAREdHXBLrwWgyDVTSttmCwNlJdkPb_HLJ9H-0EJooatqlEJON5p5_BBmdS9swwEkjjnP-M0lXzIpc43dVj_WW_xKjZhHWE9p8ygN7I7J0PqbGhe-CBaW3ybckerd0dA0aOWJ66EkDLlJVzlcxMyq5u0bzGfvHCnYe2lkcVt_T_l26C5WiF-GW9WipeVYJoCNgPR3ZCmDkBsrWXwrdzprbRf7WvKvk-xd6BLqI39WjhURK1gedO9SlqrrVSEDNxyky2wQhBcrGXUkP9gZsjz8FuKtw');
    headers.append('Accept', '*/*');
    return this.http.post("https://localhost:7190/api/Requests/document", formData, {headers});
  }
}
