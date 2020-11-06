import {Injectable} from '@angular/core';
import {Server} from '../models/server.model';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {delay, mergeMap, retryWhen} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(`${environment.apiUrl}/servers`);
  }

  getServer(id: number): Observable<Server> {
    return this.http.get<Server>(`${environment.apiUrl}/servers/${id}`)
      .pipe(
        mergeMap(server => {
          if (server.status === 'REBOOTING') {
            return throwError('Server is still rebooting!');
          }
          return of(server);
        }),
        retryWhen(errors => errors.pipe(
          delay(1000)
        ))
      );
  }

  turnServer(id: number, option: 'on' | 'off'): Observable<Server> {
    return this.http.put<Server>(`http://localhost:4454/servers/${id}/${option}`, null);
  }

  rebootServer(id: number): Observable<Server> {
    return this.http.put<Server>(`http://localhost:4454/servers/${id}/reboot`, null);
  }

}
