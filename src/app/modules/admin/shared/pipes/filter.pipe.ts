import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items || !searchText) {
            return items;
        }

        searchText = searchText.toLowerCase().trim();

        // Recursive function to search through object values
        const isMatch = (obj: any, search: string): boolean => {
            if (obj === null || obj === undefined) {
                return false;
            }
            if (typeof obj === 'object') {
                return Object.values(obj).some(value => isMatch(value, search));
            }
            return String(obj).toLowerCase().includes(search);
        };

        return items.filter(item => isMatch(item, searchText));
    }
}
