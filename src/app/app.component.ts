import { Component, OnInit } from '@angular/core';
import { Contribuyente } from './Models/Contribuyente';
import { ContribuyenteService } from './Services/contribuyente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form = {
    parametro: ''
  }
  loanding: boolean = false;
  Contribuyente!: Contribuyente | undefined;

  error = {
    isError: false,
    message: ''
  }

  parametrosBusquedas = {
    rnc: 'Buscar por RNC',
    RazonSocial: 'Buscar por Razón Social'
  }

  buscarPor = this.parametrosBusquedas.rnc;
  
  constructor(private contribuyenteService: ContribuyenteService){
    
  }

  ngOnInit(){

  }

  consultarContribuyente(){
    const textSearch = this.form.parametro;
    if(textSearch.length > 0){
      this.Contribuyente = undefined;
      this.loanding = true;
      console.log(this.buscarPor)
      if(this.buscarPor === this.parametrosBusquedas.rnc) 
        this.getContribuyenteByRnc();
      if(this.buscarPor === this.parametrosBusquedas.RazonSocial)
         this.getContribuyenteByRazonSocial();
    }
  }
  
  getContribuyenteByRnc(): void {
    this.contribuyenteService.searchContribuyenteByRnc(this.form.parametro)
    .subscribe(data => {
      if(data.data){
        this.Contribuyente = data.data;
        this.setError('', false);
      }else{
        this.setError(`No se encontró ningún contribuyente con el RNC '${this.form.parametro}'`, true);
      }    
      this.loanding = false;
    }, error => {
      this.loanding = false;
      this.setError('Ocurrio un error inesperado!', true);
    });
  }

  getContribuyenteByRazonSocial(): void {
    this.contribuyenteService.searchContribuyenteByRazonSocial(this.form.parametro)
      .subscribe(data => {
      if(data.data){
        this.Contribuyente = data.data;
        this.setError('', false);
      }else{
        this.setError(`No se encontró ningún contribuyente con la Razón Social '${this.form.parametro}'`, true);
      }    
      this.loanding = false;
    }, error => {
      this.loanding = false;
      this.setError('Ocurrio un error inesperado!', true);
    });
  }
  
  setError(message: string, estatus: boolean){
    this.error.isError = estatus;
    this.error.message = message;
  }

  reset(): void {
    this.form.parametro = '';
    this.buscarPor = this.parametrosBusquedas.rnc;
    this.Contribuyente = undefined;
    this.setError('', false);
  }

}
