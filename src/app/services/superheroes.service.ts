import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  url:string='https://superhero-adventures-default-rtdb.firebaseio.com';

  constructor(private http:HttpClient) { }

  superheroes() {
    return this.http.get(`${this.url}/Superheroes.json`)
      .pipe(
        map((resp: any) => {
          const res: any[] = [];
          Object.keys(resp).forEach(key => {
            const sheroe: any = resp[key];
            sheroe.id = key;
            res.push(sheroe);
          });
          return res;
        })
      );
  }

  registrarSuperHeroe(superheroe:any) {
    return this.http.post(`${this.url}/Superheroes.json`, superheroe)
  }
}
