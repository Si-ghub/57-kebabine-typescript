class Produktas {
    constructor(pavadinimas, svoris, kaina) {
        this.kaina = kaina;
        this.svoris = svoris;
        this.pavadinimas = pavadinimas;
        this._barcode = 100000 + Math.round(Math.random() * 10000);
    }
    get barcode() {
        return this._barcode;
    }
    spausdintiDuomenis(element) {
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
var BulvytesTipas;
(function (BulvytesTipas) {
    BulvytesTipas["Lazdeles"] = "lzdl";
    BulvytesTipas["Laiveliai"] = "lvl";
    BulvytesTipas["Puseles"] = "psls";
})(BulvytesTipas || (BulvytesTipas = {}));
class A {
}
const a = new A();
a.x;
class B extends A {
    metodas() {
        this.z;
        this.x;
    }
}
class Bulvytes extends Produktas {
    constructor(kiekis, tipas = BulvytesTipas.Lazdeles) {
        super("Bulvytės", 150, 2);
        this.tipas = tipas;
        this.kiekis = kiekis;
    }
    spausdintiDuomenis() {
        super.spausdintiDuomenis();
        console.log(`Kiekis: ${this.kiekis}`);
        console.log(`Tipas: ${this.tipas}`);
        console.log("-------");
    }
}
var PadazoTipas;
(function (PadazoTipas) {
    PadazoTipas[PadazoTipas["Cesnakinis"] = 0] = "Cesnakinis";
    PadazoTipas[PadazoTipas["Astrus"] = 1] = "Astrus";
    PadazoTipas[PadazoTipas["Pikantiskas"] = 2] = "Pikantiskas";
    PadazoTipas[PadazoTipas["BBQ"] = 3] = "BBQ";
})(PadazoTipas || (PadazoTipas = {}));
class Padazas extends Produktas {
    constructor(tipas, pavadinimas) {
        super(pavadinimas, 40, 0.6);
        this.tipas = tipas;
    }
    spausdintiDuomenis() {
        super.spausdintiDuomenis();
        console.log(`Padažo tipas: ${PadazoTipas[this.tipas]}`);
    }
}
class Kebabas extends Produktas {
    constructor(svoris = 700) {
        super("Kebabas", svoris, 4.5);
        this.padazai = [];
    }
    pridetiPadaza(padazas) {
        this.padazai.push(padazas);
    }
    ;
    spausdintiDuomenis() {
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
    nameInput: document.getElementById("produktoPavadinimas"),
    priceInput: document.getElementById("produktoKaina"),
    weightInput: document.getElementById("produktoSvoris"),
    addButton: document.getElementById("pridetiProdukta"),
    menuContainer: document.querySelector(".menu")
};
let produktai = [];
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
    console.log(`Praėjo ${skirtumas} sek.`);
});
function atvaizduotiProduktus() {
    UI.menuContainer.innerHTML = "";
    for (const produktas of produktai) {
        produktas.spausdintiDuomenis(UI.menuContainer);
    }
}
function kopijuotiProdukta() {
    console.log("Kopijuoti produktą...");
}
function istrintiProdukta(barcode) {
    console.log("Trinti produktą...", barcode);
    produktai = produktai.filter((produktas) => produktas.barcode !== barcode);
    atvaizduotiProduktus();
}
