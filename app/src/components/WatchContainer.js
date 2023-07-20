import { useState } from 'react';
import styles from './style/WatchContainer.module.css';
import Watch from './Watch';
import { getGmtTab } from './utils/WatchContainer';



function WatchContainer() {

    const gmtTab = getGmtTab();
    const myElements = gmtTab.map((x, i) =>
        <Watch key={i} GMT={gmtTab[i]} />
    )
    const [watches, setWateches] = useState({
        watches: myElements
    })

    const [isButtonClicked, setIsButtonClicked] = useState({
        isClicked: false
    })

    const handleClick = () => {
        
        setIsButtonClicked({
            isClicked: !isButtonClicked.isClicked
        })
    }

    const handleChange = () => {
        const gmt = document.getElementById("GMT").value;
        const newWatch = <Watch key={watches.watches.length} GMT={gmt} />;
        var watchesArray = watches.watches
        watchesArray.push(newWatch)
        setWateches({ watches: watchesArray })
        setIsButtonClicked({
            isClicked: false
        })
    }

    return <div>
        {isButtonClicked.isClicked ?
            <div className={styles.tool}>
                
                <select className={styles.select} name="GMT" id="GMT" onChange={handleChange} size="3">
                    <option value="-12">GMT-12</option>
                    <option value="-11">GMT-11</option>
                    <option value="-10">GMT-10</option>
                    <option value="-9">GMT-9</option>
                    <option value="-8">GMT-8</option>
                    <option value="-7">GMT-7</option>
                    <option value="-6">GMT-6</option>
                    <option value="-5">GMT-5</option>
                    <option value="-4">GMT-4</option>
                    <option value="-3">GMT-3</option>
                    <option value="-2">GMT-2</option>
                    <option value="-1">GMT-1</option>
                    <option value="0">GMT+0</option>
                    <option value="1">GMT+1</option>
                    <option value="2">GMT+2</option>
                    <option value="3">GMT+3</option>
                    <option value="4">GMT+4</option>
                    <option value="5">GMT+5</option>
                    <option value="6">GMT+6</option>
                    <option value="7">GMT+7</option>
                    <option value="8">GMT+8</option>
                    <option value="9">GMT+9</option>
                    <option value="10">GMT+10</option>
                    <option value="11">GMT+11</option>
                    <option value="12">GMT+12</option>
                </select>
            </div>
            : 
        <div className={styles.tool}>
        <button className={styles.button} onClick={handleClick}>Add a new watch</button>
        </div>
        }
       
    <div className={styles.container} id="watchContainer">
        {watches.watches}
    </div>
</div>
}

export default WatchContainer;