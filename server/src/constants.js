const pagesize = 5;
const accessCookie = 30 * 60 * 1000;
const accessToken = '30m';
const refreshCookie = 7 * 24 * 60 * 60 * 1000;
const refreshToken = '7d';

const monthReceita = [{ mes: "Jan", receita: 0 }, { mes: "Fev", receita: 0 }, { mes: "Mar", receita: 0 }, { mes: "Abr", receita: 0 }, { mes: "Mai", receita: 0 }, { mes: "Jun", receita: 0 },
    { mes: "Jul", receita: 0 }, { mes: "Ago", receita: 0 }, { mes: "Set", receita: 0 }, { mes: "Out", receita: 0 }, { mes: "Nov", receita: 0 }, { mes: "Dez", receita: 0 }
]


const monthVendas = [{ mes: "Jan", vendas: 0 }, { mes: "Fev", vendas: 0 }, { mes: "Mar", vendas: 0 }, { mes: "Abr", vendas: 0 }, { mes: "Mai", vendas: 0 }, { mes: "Jun", vendas: 0 },
    { mes: "Jul", vendas: 0 }, { mes: "Ago", vendas: 0 }, { mes: "Set", vendas: 0 }, { mes: "Out", vendas: 0 }, { mes: "Nov", vendas: 0 }, { mes: "Dez", vendas: 0 }
]



const lojasDefault = {
    "barcelos": 0,
    "viana": 0,
    "guima": 0,
    "santander": 0,
    "leiria": 0,
    "caldas": 0,
}


const lojasColorsNSizes = {
    "barcelos": "",
    "viana": "",
    "guima": "",
    "santander": "",
    "leiria": "",
    "caldas": "",
    totalStockBarcelos: 0,
    totalStockViana: 0,
    totalStockBGuima: 0,
    totalStockSantander: 0,
    totalStockLeiria: 0,
    totalStockCaldas: 0,
};


const formatReceitasinMonth = (receita) => {
    receitasMonth = [{ mes: "Jan", receita: 0 }, { mes: "Fev", receita: 0 }, { mes: "Mar", receita: 0 }, { mes: "Abr", receita: 0 }, { mes: "Mai", receita: 0 }, { mes: "Jun", receita: 0 },
        { mes: "Jul", receita: 0 }, { mes: "Ago", receita: 0 }, { mes: "Set", receita: 0 }, { mes: "Out", receita: 0 }, { mes: "Nov", receita: 0 }, { mes: "Dez", receita: 0 }
    ];
    for (var i = 0; i < receita.length; i++) {
        var entry = receita[i].mes;
        receitasMonth[entry - 1].receita = receita[i].receita;
    }
    return receitasMonth

}


const formatVendasinMonth = (vendas) => {
    var vendasMonth = [{ mes: "Jan", vendas: 0 }, { mes: "Fev", vendas: 0 }, { mes: "Mar", vendas: 0 }, { mes: "Abr", vendas: 0 }, { mes: "Mai", vendas: 0 }, { mes: "Jun", vendas: 0 },
        { mes: "Jul", vendas: 0 }, { mes: "Ago", vendas: 0 }, { mes: "Set", vendas: 0 }, { mes: "Out", vendas: 0 }, { mes: "Nov", vendas: 0 }, { mes: "Dez", vendas: 0 }
    ];
    for (var i = 0; i < vendas.length; i++) {
        var entry = vendas[i].mes;
        vendasMonth[entry - 1].vendas = vendas[i].vendas;
    }
    return vendasMonth

}



const formatLojasDefault = (lojas, stores, totalStock) => {
    for (var i = 0; i < stores.length; i++) {
        var obj = stores[i];
        switch (obj.armazem) {
            case 9:
                lojas.barcelos += obj.stock
                break;
            case 10:
                lojas.viana += obj.stock
                break;
            case 11:
                lojas.guima += obj.stock
                break;
            case 132:
                lojas.santander += obj.stock
                break;
            case 200:
                lojas.leiria += obj.stock
                break;
            case 201:
                lojas.caldas += obj.stock
                break;

            default:
                console.log("localizaçao desconhecida");
        }

        totalStock += obj.stock
    }
    return lojas, totalStock
}

const formatLojasColorsNSizes = (myMap, colors, totalStock) => {
    for (var i = 0; i < colors.length; i++) {

        var obj = colors[i];
        if (myMap.get(obj.cor) === undefined) {
            let value = {...lojasColorsNSizes };
            myMap.set(obj.cor, value);
            //console.log(myMap.get(obj.cor));
        }
        var tmp = "";
        switch (obj.armazem) {

            case 9:
                obj.stock > 1 ? tmp = obj.stock : tmp = ""
                myMap.get(obj.cor).totalStockBarcelos += obj.stock;
                myMap.get(obj.cor).barcelos = myMap.get(obj.cor).barcelos.concat(tmp).concat(obj.tam, ",");

                break;
            case 10:

                obj.stock > 1 ? tmp = obj.stock : tmp = ""
                myMap.get(obj.cor).totalStockViana += obj.stock;
                myMap.get(obj.cor).viana = myMap.get(obj.cor).viana.concat(tmp).concat(obj.tamanho, ",");
                break;
            case 11:

                obj.stock > 1 ? tmp = obj.stock : tmp = ""
                myMap.get(obj.cor).totalStockBGuima += obj.stock;
                myMap.get(obj.cor).guima = myMap.get(obj.cor).guima.concat(tmp).concat(obj.tam, ",");
                break;
            case 132:

                obj.stock > 1 ? tmp = obj.stock : tmp = ""
                myMap.get(obj.cor).totalStockSantander += obj.stock;
                myMap.get(obj.cor).santander = myMap.get(obj.cor).santander.concat(tmp).concat(obj.tam, ",");
                break;
            case 200:

                obj.stock > 1 ? tmp = obj.stock : tmp = ""
                myMap.get(obj.cor).totalStockLeiria += obj.stock;
                myMap.get(obj.cor).leiria = myMap.get(obj.cor).leiria.concat(tmp).concat(obj.tam, ",");
                break;
            case 201:

                obj.stock > 1 ? tmp = obj.stock : tmp = ""
                myMap.get(obj.cor).totalStockCaldas += obj.stock;
                myMap.get(obj.cor).caldas = myMap.get(obj.cor).caldas.concat(tmp).concat(obj.tam, ",");
                break;

            default:
                console.log("localizaçao desconhecida");
        }
        totalStock += obj.stock
    }
    return myMap, totalStock

}






module.exports = {
    pagesize: pagesize,
    accessCookie: accessCookie,
    accessToken: accessToken,
    refreshCookie: refreshCookie,
    refreshToken: refreshToken,
    lojasDefault: lojasDefault,
    formatLojasDefault: formatLojasDefault,
    lojasColorsNSizes: lojasColorsNSizes,
    formatLojasColorsNSizes: formatLojasColorsNSizes,
    formatReceitasinMonth: formatReceitasinMonth,
    formatVendasinMonth: formatVendasinMonth
};