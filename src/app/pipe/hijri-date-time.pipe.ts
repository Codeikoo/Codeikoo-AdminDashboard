import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hijriDateTime'
})
export class HijriDateTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let hijri = new Date(value).toLocaleString("ar-u-ca-islamic-umalqura", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    return hijri;
  }

}
