import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url:string='https://superhero-adventures-default-rtdb.firebaseio.com';

  constructor(private http:HttpClient) { }

  usuarios() {
    return this.http.get(`${this.url}/Usuarios.json`)
      .pipe(
        map((resp: any) => {
          const res: any[] = [];
          Object.keys(resp).forEach(key => {
            const user: any = resp[key];
            user.id = key;
            res.push(user);
          });
          return res;
        })
      );
  }

  registrarUsuario(usuario:any) {
    return this.http.post(`${this.url}/Usuarios.json`, usuario);
  }

  seleccionUsuario(id: any) {
    return this.http.get(`${this.url}/Usuarios/${id}.json`);
  }

  editarUsuario(usuario:any) {
    const idTemp = {
      ...usuario
    }
    delete idTemp.id;

    return this.http.put(`${this.url}/Usuarios/${usuario.id}.json`, idTemp);
  }

  eliminarUsuario(id:any) {
    return this.http.delete(`${this.url}/Usuarios/${id}.json`);
  }
}
