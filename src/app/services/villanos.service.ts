import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VillanosService {

  url:string='https://superhero-adventures-default-rtdb.firebaseio.com';

  constructor(private http:HttpClient) { }

  villanos() {
    return this.http.get(`${this.url}/Villanos.json`)
      .pipe(
        map((resp: any) => {
          const res: any[] = [];
          Object.keys(resp).forEach(key => {
            const svill: any = resp[key];
            svill.id = key;
            res.push(svill);
          });
          return res;
        })
      );
  }

  registrarVillano(villano:any) {
    return this.http.post(`${this.url}/Villanos.json`, villano);
  }

  seleccionVillano(id: any) {
    return this.http.get(`${this.url}/Villanos/${id}.json`);
  }

  editarVillano(villano:any) {
    const idTemp = {
      ...villano
    }
    delete idTemp.id;

    return this.http.put(`${this.url}/Villanos/${villano.id}.json`, idTemp);
  }

  eliminarVillano(id:any) {
    return this.http.delete(`${this.url}/Villanos/${id}.json`);
  }
}
