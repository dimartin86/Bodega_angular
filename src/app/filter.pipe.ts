import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(prods: any, term: any): any {
    if(term === undefined) return prods;

    return prods.filter(function(prods){
    	return prods.nombre.toLowerCase().includes(term.toLowerCase());
    })
  }

}
