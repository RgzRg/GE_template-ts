//mode peut être ST, auquel cas on a un affichage classique et on va de 0 à 23h
//par exemple 22:23 ou 07:45
//sinon mode peut être AM ou PM, auquel cas on a un affichage qui change pour les heures, et on va de 1 à 12 AM/PM
//par exemple 11:23 PM ou 7:45 AM
//en mode AM ou PM, l'heure qu'on affiche n'est jamais précédée par 0, contrairement au mode ST


//Permet d'obtenir un affichage cohérent avec le mode (ST ou AM/PM)
//Cette fonction peut s'utiliser aussi bien avec une entrée complète (heure, minute et seconde)
//qu'avec une seule modalité (juste heure ou juste seconde)
export function haveNiceDisplay(timeData, mode){ 
    let res = {};
    for (const property in timeData){
        if(property === "hours" && mode !== "ST"){
            res[property] = parseInt(timeData[property])
        }else{
            res[property] = parseInt(timeData[property]) < 10 ? "0".concat(parseInt(timeData[property])) : timeData[property];
        }
       
    }
    return res;
  }
  
  //Permet de calculer la nouvelle heure lorsqu'une seconde a été ajoutée
  //Prend en compte le mode car dans le cas de ST les heures vont de 0 à 23, de 1 à 12 dans le cas de AM/PM
  export function nextSecond(h,m,s,mode){
    var S = parseInt(s);
    var M = parseInt(m);
    var H = parseInt(h);
        if(S === 60){
            S=0;
            M++;
        }
        if(M === 60){
            M=0;
            H++;
        }
        if(mode === "ST"){
            if(H === 24){
                H=0;
            }
        }else{
            if(H === 13){
                H=1;
            }
        }
        
    return {hours: H, minutes:M, seconds:S, mode:mode};
  }
  
//Permet de passer du mode AM/PM au mode ST
export function fromAmToSt(h,mode) {
    if(mode === "AM"){
        return parseInt(h)===12 ? 0 : parseInt(h)
    }else{
        return parseInt(h) === 12 ? 12 : parseInt(h) + 12
    }
}

//permet de passer du mode ST au mode AM/PM
export function fromStToAm(h){
   const mode = (parseInt(h)<12) ? "AM" : "PM";
   const hours = (parseInt(h)%12===0) ? 12 : parseInt(h)%12;
   return {hours,mode}
}

//Permet de récupérer l'heure d'un GMT donné
export function init(shift){
    var getDate = new Date()
    getDate.setHours(getDate.getHours() + shift);
    const getHour = getDate.getHours();
    const getMinute = getDate.getMinutes();
    const getSecond = getDate.getSeconds();
    return haveNiceDisplay({hours: getHour, minutes: getMinute, seconds: getSecond}, "ST");
}

//Permet de créer l'élément Watch avec des valeurs issues de l'état 
//Permet de pouvoir scaler l'objet montre
export function initDimensions(){
    return {
        watchWidth : 227,
        watchHeight : 225,
        screenWidth : 128,
        screenHeight : 63,
        screenTop : 79,
        screenLeft : 50,
        firstSpaceLeft : 42.24,
        minutesLeft : 51.2,
        secondSpaceLeft : 93.44,
        widthBtn : 8,
        heightBtn : 14,
        modeTop : 72,
        increaseBottom : 84,
        nightModeBottom : 84,
        resetTop : 72,
        amModeLeft : 110,
        amModetop : 47,
        xlargeFont : 23,
        smallFont : 13
    }
}

//Crée un objet qui contient toutes les dimensions nécessaires à la création de l'objet Watch avec un facteur de scale en X et en Y
export function setDimensions(dim,x_scale, y_scale, reset){
    const xlargeFont = reset ? 23 : Math.round(x_scale*20) + x_scale*2;
    return {
            watchWidth : dim.watchWidth * x_scale,
            watchHeight : dim.watchHeight * y_scale,
            screenWidth : dim.screenWidth * x_scale,
            screenHeight : dim.screenHeight * y_scale,
            screenTop : dim.screenTop * y_scale,
            screenLeft : dim.screenLeft * x_scale,
            firstSpaceLeft : dim.firstSpaceLeft * x_scale,
            minutesLeft : dim.minutesLeft * x_scale,
            secondSpaceLeft : dim.secondSpaceLeft * x_scale,
            widthBtn : dim.widthBtn * x_scale,
            heightBtn : dim.heightBtn * y_scale,
            modeTop : dim.modeTop * y_scale,
            increaseBottom : dim.increaseBottom * y_scale,
            nightModeBottom : dim.nightModeBottom * y_scale,
            resetTop : dim.resetTop * y_scale,
            amModetop : dim.amModetop * y_scale,
            amModeLeft : dim.amModeLeft * x_scale,
            xlargeFont: xlargeFont,
            smallFont: 0.7* xlargeFont
    }
}


