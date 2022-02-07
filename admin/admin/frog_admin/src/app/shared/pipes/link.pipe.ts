import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({
    name: 'link'
})
export class LinkPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let new_link = '/' + environment.adminUrl;
        if (value !== '') {
            new_link += '/' + value;
        }
        return new_link;
    }

}
