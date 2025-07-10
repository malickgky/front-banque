import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'includes', standalone: true })
export class IncludesPipe implements PipeTransform {
    transform(value: string, searchString: string): boolean {
        if (!value || !searchString) {
            return false;
        }
        return value.includes(searchString);
    }
}
