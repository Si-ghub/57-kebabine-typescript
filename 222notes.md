```ts
// elementu-reiksmiu masyvas, MODEL
const elementai = ['aaa', 'bbb', 'ccc'];

// padarem sisitem kuri tuos stringus/objektus atspausdina. funkcija praeina pro kiekviena elementa
// ir kiekvieno elemento info ideda i HTML
// iskvietus sia funkcija i body turetu ideti "aaa", "bbb", "ccc";
// += reiskia ideti turini i body(HTML)
function printData(): void {
  for (const elementas of elementai) {
    document.querySelector('body').innerHTML += elementai;
  }
}

printData();

// vietoje stringu turime objektus, kuriuos aprasom kad kievienas objektas turetu metoda
// spausdinti duomenis ir paduodame i koki elementa jam spausdinti
// kieviena karta keiciant masyva (pridedant, istrinant) ir keiciantis duomenim mes juos visada atspausdinam i HTML
// MODEL VIEW CONTROLER
// Kiekvienas modelis (klase) yra atsakinga uz savo viewer dali
```
