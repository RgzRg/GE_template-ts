
//Permet de savoir si une chaîne de caractère est un float
export function is_numeric(str){
    return /^[+-]?\d+(\.\d+)?$/.test(str);
}

//Permet d'obtenir une valeur entre -1 et 1
export function normalize(str){
    var val = parseFloat(str);
    if(val === 0){
      return val;
    }
    if(val > 0){
      return val%1 === 0 ? 1 : val%1;
    }else{
      return val%1 === 0 ? -1 : val%1;
    }
  }


export function multiplyMatrices(m1,m2){
    var res = new Array(m2.length);
    if(m1[0].length === m2.length){
      for (let j=0; j<m2[0].length; j++){
        res[j] = new Array(m1.length)
        for(let i=0; i<m1.length; i++){
          let total = 0;
          for(let k=0; k<m1[0].length; k++){
            total += m1[i][k]*m2[k][j]
          }
          res[j][i] = total;
        }
      }
    }
    
    return res;
  }
