import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContainerDTO } from '../models/container-dto';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  containerURL: string = 'http://localhost:8080/containers/';

  constructor(private httpClient: HttpClient) { }

  public listAll(): Observable<ContainerDTO[]> {
    return this.httpClient.get<ContainerDTO[]>(this.containerURL + 'listAll');
  }

  public details(id: number): Observable<ContainerDTO> {
    return this.httpClient.get<ContainerDTO>(this.containerURL + `details/${id}`);
  }

  public createContainer(containerDTO: ContainerDTO): Observable<ContainerDTO> {
    return this.httpClient.post<ContainerDTO>(this.containerURL + 'create', containerDTO);
  }

  public deleteContainer(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.containerURL + `delete/${id}`)
  }

  public updateContainer(id: number, object: ContainerDTO): Observable<ContainerDTO> {
    return this.httpClient.put<ContainerDTO>(this.containerURL + `update/${id}`, object);
  }
}
