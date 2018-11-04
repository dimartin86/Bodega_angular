import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


declare var $:any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

	items: Observable<any[]>;
	json = [];

	constructor(private router: Router,db: AngularFirestore) {
		this.items = db.collection('usuarios').valueChanges();  

		this.items.subscribe((items) => {			
			 this.json = items;
		}); 		
	}

	ngOnInit() {
	}

	login(form: NgForm){	
		if (form.value.correo == '' || form.value.pass == '') {	 
 			alert('Los campos no pueden estar vacios');
		}else{
			var json = this.json;
			var result = 0;

			var wantedKey1 = 'nombreusu';
			var wantedVal1 = form.value.correo;
			var wantedKey2 = 'pass';
			var wantedVal2 = form.value.pass;

			var arr_existe= [];

			for(var i = 0; i < json.length; i++){

			   if(json[i].hasOwnProperty(wantedKey1) && json[i][wantedKey1] === wantedVal1) {
			   		if(json[i].hasOwnProperty(wantedKey2) && json[i][wantedKey2] === wantedVal2) {
			   			arr_existe.push(1);	   			
			   		}
			   		else{
			   			arr_existe.push(2);	   
			   		}	
			   }

			}


			if (arr_existe.includes(1) 	|| arr_existe.includes(2)) {
				if (arr_existe.includes(1)) {
					this.router.navigateByUrl('/productos');
					localStorage.setItem('correo', form.value.correo);
				}else{
					alert('La clave es incorrecta');
				}				
			}else{
				alert('El correo no se encuentra registrado');
			}			
		}
	}

}
