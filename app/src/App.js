import React, { useState } from 'react';
import WatchContainer from './components/WatchContainer';
import WatchManipulator from './components/WatchManipulator';
import styles from './App.module.css'



document.getElementsByTagName("html")[0].style.height = "100%";
document.body.style.height = "100%";
document.getElementById("root").style.height = "100%";

function App() {

  const [isClicked, setIsClicked] = useState({
    isClicked: false
  })

  const handleClick = () => {
      setIsClicked({
        isClicked: !isClicked.isClicked
      })
  }

  return ( isClicked.isClicked === false ?
    <div className={styles.App}>
         <div style={{backgroundColor:"white", width:"100%", height:"100pv"}}>
            <button className={styles.button} onClick={handleClick}>Go To Watch Manipulation</button>
        </div>
        <br/>
       
          <WatchContainer />
          
    </div>
    : 
    <div className={styles.App}>
        <div style={{backgroundColor:"white", width:"100%", height:"100pv"}}>
            <button className={styles.button} onClick={handleClick}>Go Back To The Main Page</button>
        </div> 
        <br/>
        
          <WatchManipulator />
    </div>
  );
}



export default App;

