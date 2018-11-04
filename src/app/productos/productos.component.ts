import { Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  // num_prods = 0;
  acum_prods = 0;
  desc_productos = [];
  term = '';

  items: Observable<any[]>;
  constructor(private router: Router,db: AngularFirestore) {
    if(localStorage.getItem('correo')===null){
      this.router.navigateByUrl('/auth');
    }
    
    this.items = db.collection('productos').valueChanges();  
  }  	

  ngOnInit() {

  }

  contenidoVerMas(imagen, nombre, precio, unidades){
    var html1 = '<img src="'+ imagen +'" height="300"><br><br>';
    html1 += '<h5> Precio: '+ precio +'</h5>';
    html1 += '<h5> Unidades disponibles: '+ unidades +'</h5>';

  	 $('.modal-body').html(html1);
  	 $('.modal-title').text(nombre);

     return false;
  }

  ingresarProdCarrito(form: NgForm){
     this.acum_prods+= form.value.num_prods;

     this.desc_productos.push({nombre: form.value.nombre_prod, total: parseFloat(form.value.precio_prod)*parseFloat(form.value.num_prods), ubicacion: form.value.ubicacion_prod, unidades: form.value.num_prods});

     $('.alerta_carro').show().text(this.acum_prods);
     $('.cnum_prods').val('');
     // alert(this.acum_prods)
  }

  vistaPrincipal(){
      $('.secundario').hide();
      $('.principal').show(); 
      $('.alerta_carro').hide(); 
  }


  iraPagar(){
    if (this.acum_prods > 0) {
      this.acum_prods=0;
      var arr_prod = this.desc_productos;
      this.desc_productos = [];

      var html3='<div class="row"><div class="col-md-6">'  
      var total = 0;

      for (var i in arr_prod) {
        html3+='<img src="'+arr_prod[i].ubicacion+'" height="130" style="margin-top: 10px;">'
        html3+='<b>Unidades: </b>'+arr_prod[i].unidades+' <br>'
        html3+='<b>Subtotal: </b>'+arr_prod[i].total+' <br>'

        total+= arr_prod[i].total;
      } 

      html3 += '</div><div class="col-md-6"><h3>Total: '+total+'<h3>'
      html3 += '<button id="btn_cancelar">Cancelar</button>'
      html3 += '<button id="btn_pagar">Pagar</button></div></div>';  

      $('.principal').hide();
      $('.secundario').html(html3)
      $('.secundario').show();

      $('#btn_cancelar').click(function(){
        $('.secundario').hide();
        $('.principal').show(); 
        $('.alerta_carro').hide(); 
      });

      $('#btn_pagar').click(function(){
        $('.secundario').hide();
        $('.principal').show(); 
        $('.alerta_carro').hide(); 
      });
    }else{
      alert('Debe seleccionar productos')
    }
  }

  salir(){
    localStorage.removeItem('correo');
    this.router.navigateByUrl('/auth');
  }
}

