import React, { useState, useEffect } from 'react';
import WatchContainer from './components/WatchContainer';
import styles from './App.module.css'



document.getElementsByTagName("html")[0].style.height = "100%";
document.body.style.height = "100%";
document.getElementById("root").style.height = "100%";

function App() {
  return (
    <div className={styles.App}>
          
          <WatchContainer />
          
    </div>
  );
}

export default App;

