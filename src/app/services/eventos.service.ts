import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url:string='https://superhero-adventures-default-rtdb.firebaseio.com';

  constructor(private http:HttpClient) { }

  eventos() {
    return this.http.get(`${this.url}/Eventos.json`)
      .pipe(
        map((resp: any) => {
          const res: any[] = [];
          Object.keys(resp).forEach(key => {
            const event: any = resp[key];
            event.id = key;
            res.push(event);
          });
          return res;
        })
      );
  }

  registrarEvento(evento:any) {
    return this.http.post(`${this.url}/Eventos.json`, evento);
  }

  seleccionEvento(id: any) {
    return this.http.get(`${this.url}/Eventos/${id}.json`);
  }

  editarEvento(evento:any) {
    const idTemp = {
      ...evento
    }
    delete idTemp.id;

    return this.http.put(`${this.url}/Eventos/${evento.id}.json`, idTemp);
  }

  eliminarEvento(id:any) {
    return this.http.delete(`${this.url}/Eventos/${id}.json`);
  }
}
