import { useRef, useState } from "react";
import { is_numeric, normalize, multiplyMatrices } from "./utils/WatchManipulator";
import styles from './style/WatchManipulator.module.css';
import Watch from './Watch'

function WatchManipulator(){

  const ref = useRef(null)

  const [scale, setScale] = useState({
     x_scale:1,
     y_scale:1,
     totalXScale: 1,
     totalYScale: 1,
     reset: false
  })

  const [position, setPosition] = useState({
    translateX: 0,
    translateY: 0,
    rotationP1: 1,
    rotationP2 : 0,
    rotationP3: 0,
    rotationP4: 1
  })


  const handleClick = () => {

    var scaleX = is_numeric(document.getElementById("scaleX").value) ? parseFloat(document.getElementById("scaleX").value) : 1;
    var scaleY = is_numeric(document.getElementById("scaleY").value) ? parseFloat(document.getElementById("scaleY").value) : 1;

    scaleX = scaleX === 0 ? 1 : scaleX;
    scaleY = scaleY === 0 ? 1 : scaleY;

    var translateX = is_numeric(document.getElementById("translateX").value) ? parseFloat(document.getElementById("translateX").value) : 0;
    var translateY = is_numeric(document.getElementById("translateY").value) ? parseFloat(document.getElementById("translateY").value) : 0;
    var rotationP1 = is_numeric(document.getElementById("rotationP1").value) ? parseFloat(document.getElementById("rotationP1").value) : 1;
    var rotationP2 = is_numeric(document.getElementById("rotationP2").value) ? parseFloat(document.getElementById("rotationP2").value) : 0;
    var rotationP3 = is_numeric(document.getElementById("rotationP3").value) ? parseFloat(document.getElementById("rotationP3").value) : 0;
    var rotationP4 = is_numeric(document.getElementById("rotationP4").value) ? parseFloat(document.getElementById("rotationP4").value) : 1;

    rotationP1 = normalize(rotationP1);
    rotationP2 = normalize(rotationP2);
    rotationP3 = normalize(rotationP3);
    rotationP4 = normalize(rotationP4);

    if(rotationP1 === 0 && rotationP2 === 0 && rotationP3 === 0 && rotationP4 === 0){
      rotationP1 =1;
      rotationP4 =1;
    }

    const currentRotationMtx = [[position.rotationP1, position.rotationP2],[position.rotationP3, position.rotationP4]];
    const rotationToAdd = [[rotationP1,rotationP2],[rotationP3,rotationP4]];
    const newRotation = multiplyMatrices(currentRotationMtx, rotationToAdd);
    var newTranslationX = translateX + position.translateX;
    var newTranslationY = translateY + position.translateY;
    newTranslationY = newTranslationY < -70 ? -70 : newTranslationY;

    setScale({
      x_scale:scaleX,
      y_scale:scaleY,
      totalXScale: scale.totalXScale*scaleX,
      totalYScale: scale.totalYScale*scaleY,
      reset: false
    })

    ref.current.style.transform = `matrix(${newRotation[0][0]},${newRotation[1][0]},${newRotation[0][1]},${newRotation[1][1]},${newTranslationX},${newTranslationY})`;

    setPosition({
        translateX:newTranslationX,
        translateY: newTranslationY,
        rotationP1: newRotation[0][0],
        rotationP2: newRotation[1][0],
        rotationP3: newRotation[0][1],
        rotationP4: newRotation[1][1]
    })

    document.getElementById("scaleX").value = "";
    document.getElementById("scaleY").value ="";
    document.getElementById("translateX").value = "";
    document.getElementById("translateY").value = "";
    document.getElementById("rotationP1").value = "";
    document.getElementById("rotationP2").value = "";
    document.getElementById("rotationP3").value = "";
    document.getElementById("rotationP4").value = "";

        
}

const handleResetClick = () => {
    setPosition({
        translateX: 0,
        translateY: 0,
        rotationP1: 1,
        rotationP2 : 0,
        rotationP3: 0,
        rotationP4: 1
    })
    setScale({
        x_scale: Math.round((1/scale.totalXScale)*100)/100,
        y_scale: Math.round((1/scale.totalYScale)*100)/100,
        totalXScale: 1,
        totalYScale: 1,
        reset: true
    })
    ref.current.style.transform = `matrix(1,0,0,1,0,0)`;
}


return (

    
    
      <div style={{height:"content-fit", width:"content-fit"}}>
        <div className={styles.container}>
          <div className={styles.dataInputContainer}>
            <label>Scale Factors</label><br />
            <div><input type="text" id="scaleX" className={styles.dataInput} /></div>
            <div><input type="text" id="scaleY" className={styles.dataInput} /></div>
          </div>
          <div className={styles.dataInputContainer}>
            <label>Translate Factors</label><br />
            <div><input type="text" id="translateX" className={styles.dataInput} /></div>
            <div><input type="text" id="translateY" className={styles.dataInput} /></div>
          </div>
          <div className={styles.dataInputContainer}>
            <label>Rotation Matrix</label><br />
            <div style={{ display: "inline-block" }}>
              <div><input type="text" id="rotationP1" className={styles.dataInput} /></div>
              <div><input type="text" id="rotationP2" className={styles.dataInput} /></div>
            </div>
            <div style={{ display: "inline-block" }}>
              <div><input type="text" id="rotationP3" className={styles.dataInput} /></div>
              <div><input type="text" id="rotationP4" className={styles.dataInput} /></div>
            </div>
          </div>
          <div className={styles.dataInputContainer}>
            <button className={styles.button} onClick={handleClick}>Submit</button>
          </div>
          <div className={styles.dataInputContainer}>
          <button className={styles.button}  onClick={handleResetClick}>Reset</button>
          </div>

        </div>
        <div style={{ display: "block" }}>
          <Watch ref={ref} GMT={2} scale={scale}/>
        </div>
        <br/>
        <br/>
        
      </div>
    
        
  );
}

export default WatchManipulator;
