class Produktas {
    public get barcode(): number {
        return this._barcode;
    }

    public readonly pavadinimas: string;
    public readonly svoris: number;
    public readonly kaina: number;
    private readonly _barcode: number;

    public constructor(pavadinimas: string,
        svoris: number,
        kaina: number) {

        this.kaina = kaina;
        this.svoris = svoris;
        this.pavadinimas = pavadinimas;

        this._barcode = 100000 + Math.round(Math.random() * 10000);
    }

    public spausdintiDuomenis(element?: HTMLElement): void {
        if (element) {
            element.innerHTML += `
                <div class="card">
                    <div class="controls">
                        <img onclick="istrintiProdukta(${this._barcode})" class="icon delete" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png">
                        <img onclick="kopijuotiProdukta()" class="icon copy" src="https://cdn-icons-png.flaticon.com/512/54/54702.png">
                    </div>
                
                    <h2>${this.pavadinimas}</h2>
                    
                    <ul>
                        <li>Barkodas: <b>${this._barcode}</b></li>
                        <li>Svoris: <b>${this.svoris} g.</b></li>
                        <li>Kaina: <b>${this.kaina} eur.</b></li>
                    </ul>
                </div>`;
        }
    }
}

// Enum - https://www.typescriptlang.org/docs/handbook/enums.html
enum BulvytesTipas {
    Lazdeles = "lzdl",
    Laiveliai = "lvl",
    Puseles = "psls"
}

// Public - metodą arba atributą gali pasiekti bet kas
// Private - metodą arba atributą gali pasiekti tik pati klasė
// Protected - metodą arba atributą gali pasiekti tik pati arba
// vaikinė klasė
// Pvz.:
class A {
    public x: number;
    private y: number;
    protected z: number;
}

const a = new A();
// Galime pasiekti tik x atributą, nes jis vienintelis yra public.
a.x;

class B extends A {
    public metodas(): void {
        // Galime pasiekti tik x ir z atributu, nes jie nėra private
        // yra public.
        this.z;
        this.x;
    }
}

// Paveldėjimas
// https://www.typescriptlang.org/docs/handbook/2/classes.html#extends-clauses
class Bulvytes extends Produktas {
    public readonly kiekis: number;
    public readonly tipas: BulvytesTipas;

    constructor(kiekis: number,
        tipas: BulvytesTipas = BulvytesTipas.Lazdeles) {
        // https://www.typescriptlang.org/docs/handbook/2/classes.html#super-calls
        super("Bulvytės", 150, 2);

        this.tipas = tipas;
        this.kiekis = kiekis;
    }

    // Perrašome tėvinės klasės metodą
    // https://www.typescriptlang.org/docs/handbook/2/classes.html#overriding-methods
    public spausdintiDuomenis(): void {
        super.spausdintiDuomenis();

        console.log(`Kiekis: ${this.kiekis}`);
        console.log(`Tipas: ${this.tipas}`);
        console.log("-------");
    }
}

enum PadazoTipas {
    Cesnakinis,
    Astrus,
    Pikantiskas,
    BBQ
}

class Padazas extends Produktas {
    constructor(public readonly tipas: PadazoTipas,
        pavadinimas: string) {
        super(pavadinimas, 40, 0.6);
    }

    public spausdintiDuomenis() {
        super.spausdintiDuomenis();
        console.log(`Padažo tipas: ${PadazoTipas[this.tipas]}`);
    }
}

class Kebabas extends Produktas {
    public readonly padazai: Padazas[];

    public constructor(svoris: number = 700) {
        super("Kebabas", svoris, 4.5);

        this.padazai = [];
    }

    public pridetiPadaza(padazas: Padazas): void {
        this.padazai.push(padazas);
    };

    public spausdintiDuomenis(): void {
        super.spausdintiDuomenis();

        console.log("Padažai:");
        console.log("================");
        for (const padazas of this.padazai) {
            padazas.spausdintiDuomenis();
            console.log("---");
        }
        console.log("================");
    }
}

const UI = {
    // https://stackoverflow.com/questions/13204759/typescript-or-javascript-type-casting
    nameInput: document.getElementById("produktoPavadinimas") as HTMLInputElement,
    priceInput: document.getElementById("produktoKaina") as HTMLInputElement,
    weightInput: document.getElementById("produktoSvoris") as HTMLInputElement,
    addButton: document.getElementById("pridetiProdukta") as HTMLButtonElement,
    // https://www.typescriptlang.org/docs/handbook/2/generics.html
    menuContainer: document.querySelector<HTMLDivElement>(".menu")
}

let produktai: Produktas[] = [];

UI.addButton.addEventListener("click", (e) => {
    const pavadinimas = UI.nameInput.value;
    const svoris = Number(UI.weightInput.value);
    const kaina = Number(UI.priceInput.value);

    const pradzia = Date.now();

    const naujasProduktas = new Produktas(pavadinimas, svoris, kaina);

    produktai.push(naujasProduktas);

    atvaizduotiProduktus();

    const pabaiga = Date.now();

    const skirtumas = (pabaiga - pradzia) / 1000;

    console.log(`Praėjo ${skirtumas} sek.`)
});

function atvaizduotiProduktus(): void {
    UI.menuContainer.innerHTML = "";

    for (const produktas of produktai) {
        produktas.spausdintiDuomenis(UI.menuContainer);
    }
}

function kopijuotiProdukta(): void {
    console.log("Kopijuoti produktą...");
}

function istrintiProdukta(barcode: number): void {
    console.log("Trinti produktą...", barcode);

    // const produktroIndeksas = produktai.findIndex((produktas) => {
    //     return produktas.barcode === barcode;
    // });
    //
    // if (produktroIndeksas === -1)
    //     throw new Error("Product not found");
    //
    // produktai.splice(produktroIndeksas, 1);

    produktai = produktai.filter((produktas) => produktas.barcode !== barcode);

    atvaizduotiProduktus();
}