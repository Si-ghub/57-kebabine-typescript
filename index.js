class Produktas {
    constructor(pavadinimas, svoris, kaina, barcode) {
        this.kaina = kaina;
        this.svoris = svoris;
        this.pavadinimas = pavadinimas;
        this._barcode = barcode || 100000 + Math.round(Math.random() * 10000);
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
                        <img onclick="kopijuotiProdukta(${this._barcode})" class="icon copy" src="https://cdn-icons-png.flaticon.com/512/54/54702.png">
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
    toJSON() {
        return {
            kaina: this.kaina,
            svoris: this.svoris,
            pavadinimas: this.pavadinimas,
            barcode: this._barcode
        };
    }
}
var BulvytesTipas;
(function (BulvytesTipas) {
    BulvytesTipas["Lazdeles"] = "lzdl";
    BulvytesTipas["Laiveliai"] = "lvl";
    BulvytesTipas["Puseles"] = "psls";
})(BulvytesTipas || (BulvytesTipas = {}));
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
const PRODUCTS_LOCAL_STORAGE_KEY = "products";
const UI = {
    nameInput: document.getElementById("produktoPavadinimas"),
    priceInput: document.getElementById("produktoKaina"),
    weightInput: document.getElementById("produktoSvoris"),
    addButton: document.getElementById("pridetiProdukta"),
    menuContainer: document.querySelector(".menu")
};
let produktai = [];
UI.addButton.addEventListener("click", () => {
    const pavadinimas = UI.nameInput.value;
    const svoris = Number(UI.weightInput.value);
    const kaina = Number(UI.priceInput.value);
    const naujasProduktas = new Produktas(pavadinimas, svoris, kaina);
    produktai.push(naujasProduktas);
    atvaizduotiProduktus();
    saveProducts();
});
function atvaizduotiProduktus() {
    UI.menuContainer.innerHTML = "";
    for (const produktas of produktai) {
        produktas.spausdintiDuomenis(UI.menuContainer);
    }
}
function kopijuotiProdukta(barcode) {
    console.log("Kopijuoti produktą!");
    const produktas = produktai.find((produktas) => produktas.barcode === barcode);
    if (!produktas)
        throw new Error("Produktas nerastas!");
    const naujasProduktas = new Produktas(produktas.pavadinimas, produktas.svoris, produktas.kaina);
    produktai.push(naujasProduktas);
    naujasProduktas.spausdintiDuomenis(UI.menuContainer);
    saveProducts();
}
function istrintiProdukta(barcode) {
    console.log("Trinti produktą...", barcode);
    produktai = produktai.filter((produktas) => produktas.barcode !== barcode);
    atvaizduotiProduktus();
    saveProducts();
}
function loadProducts() {
    const p = window.localStorage.getItem(PRODUCTS_LOCAL_STORAGE_KEY);
    if (!p) {
        return;
    }
    const produktaiBeMetodu = JSON.parse(p);
    for (const produktas of produktaiBeMetodu) {
        const naujasProduktas = new Produktas(produktas.pavadinimas, produktas.svoris, produktas.kaina, produktas.barcode);
        produktai.push(naujasProduktas);
    }
    const barkodai = produktai.map((produktas) => {
        return produktas.barcode;
    });
    console.log(barkodai);
    atvaizduotiProduktus();
}
function saveProducts() {
    const produktaiString = JSON.stringify(produktai);
    window.localStorage.setItem(PRODUCTS_LOCAL_STORAGE_KEY, produktaiString);
}
loadProducts();
