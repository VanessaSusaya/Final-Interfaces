import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Pipe personalizado para filtrar datos
 * Uso: {{ usuarios | appFilter: 'admin' }}
 */
@Pipe({
  name: 'appFilter',
  standalone: true
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform<T>(items: T[], filter: string, property?: string): T[] {
    if (!items || !filter) {
      return items;
    }

    if (!Array.isArray(items)) {
      return items;
    }

    const filterValue = filter.toLowerCase();

    if (property) {
      return items.filter((item: any) =>
        item[property]?.toString().toLowerCase().includes(filterValue)
      );
    }

    return items.filter((item: any) =>
      JSON.stringify(item).toLowerCase().includes(filterValue)
    );
  }
}
