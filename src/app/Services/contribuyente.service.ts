import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { Contribuyente } from '../Models/Contribuyente';

@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService {

  constructor(private _http: HttpClient) { }

  searchContribuyenteByRnc(rnc: string): Observable<ApiResponse<Contribuyente>> {
    return this._http.get<ApiResponse<Contribuyente>>(`/api/Contribuyente/${rnc}`);
  }

  searchContribuyenteByRazonSocial(razonSocial: string): Observable<ApiResponse<Contribuyente>> {
    return this._http.get<ApiResponse<Contribuyente>>(`/api/Contribuyente/razonSocial/${razonSocial}`);
  }

}
