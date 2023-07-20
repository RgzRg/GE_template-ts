//Permet de créer un tableau de taille n avec n GMT uniques
//On se servira de ce tableau pour créer n montres sur la page principale


export function getGmtTab(){
    const nbWatches = Math.floor(Math.random() * 6) + 2;
    var gmtTab = [];
    for(let i=0; i<nbWatches; i++){
        var shiftSide = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
        var newGMT = Math.floor(Math.random() * 13) * shiftSide;
        while(gmtTab.includes(newGMT)){
            shiftSide = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
            newGMT = Math.floor(Math.random() * 13 * shiftSide);
        }
        gmtTab.push(newGMT);
    }
    return gmtTab;
}