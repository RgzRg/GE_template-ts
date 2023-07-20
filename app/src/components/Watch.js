import React, { useState, useEffect } from 'react';
import styles from './style/Watch.module.css';
import { haveNiceDisplay, nextSecond, fromAmToSt, fromStToAm, init } from './utils/Watch';



function Watch(props) {

    const gmt = props.GMT - 2;
    const startDate = init(gmt);

    const [time, setTime] = useState({
        hours: startDate.hours,
        minutes: startDate.minutes,
        seconds: startDate.seconds,
        mode: "ST"
    });

    const [colors, setColors] = useState({
        hoursColor: "black",
        minutesColor: "black",
        secondsColor: "black",
        backgroundColor: "aliceblue"
    })

    const [modeBtnState, setModeBtnState] = useState({
        mode: "No_Action"
    });

    const [nightBtnState, setNightButtonState] = useState({
        isNightMode: false
    })

    useEffect(() => {
        const interval = setInterval(() => {
            var newTime = nextSecond(time.hours, time.minutes, parseInt(time.seconds) + 1, time.mode);
            newTime = haveNiceDisplay(newTime, time.mode);
            const newData = { ...newTime, mode: time.mode }
            setTime(newData);

        }, 1000)

        return () => clearInterval(interval);
    })

    const handleModeClick = () => {
        
            if (modeBtnState.mode === "No_Action") {
                setModeBtnState({
                    mode: "Increase_Hours"
                })
                setColors({
                    hoursColor: "red",
                    minutesColor: "black",
                    secondsColor: "black",
                    backgroundColor: "aliceblue"
                })
            } else {
                if (modeBtnState.mode === "Increase_Hours") {
                    setModeBtnState({
                        mode: "Increase_Minutes"
                    })
                    setColors({
                        hoursColor: "black",
                        minutesColor: "red",
                        secondsColor: "black",
                        backgroundColor: "aliceblue"
                    })
                } else {
                    setModeBtnState({
                        mode: "No_Action"
                    })
                    setColors({
                        hoursColor: "black",
                        minutesColor: "black",
                        secondsColor: "black",
                        backgroundColor: "aliceblue"
                    })
                }
            }
            if(nightBtnState.isNightMode === true){

                setNightButtonState({
                    isNightMode: false
                })
            }
    }

    const handleIncreaseClick = () => {
        if (modeBtnState.mode !== "No_Action") {
            if (modeBtnState.mode === "Increase_Hours") {
                var newHour = -1;
                var newMode = "";
                if (time.mode === "ST") {
                    newHour = (parseInt(time.hours) + 1) % 24;
                    newMode = "ST"
                } else {
                    if ((parseInt(time.hours) + 1) % 12 === 0) {
                        newHour = 12;
                        newMode = time.mode === "AM" ? "PM" : "AM";
                    } else {
                        newHour = (parseInt(time.hours) + 1) % 12;
                        newMode = time.mode;
                    }
                }
                var newTime = { hours: newHour, minutes: time.minutes, seconds: time.seconds }
                newTime = haveNiceDisplay(newTime, newMode);
                setTime({
                    hours: newTime.hours,
                    minutes: newTime.minutes,
                    seconds: haveNiceDisplay({ seconds: new Date().getSeconds() }, "ST").seconds,
                    mode: newMode
                });

            } else {
                var newTime = { hours: time.hours, minutes: (parseInt(time.minutes) + 1) % 60, seconds: time.seconds }
                newTime = haveNiceDisplay(newTime, time.mode);
                setTime({
                    hours: newTime.hours,
                    minutes: newTime.minutes,
                    seconds: haveNiceDisplay({ seconds: new Date().getSeconds() }, "ST").seconds,
                    mode: time.mode
                });

            }
        }
    }

    const handleNightModeClick = () => {
        if (nightBtnState.isNightMode) {
            setNightButtonState({
                isNightMode: false
            })
            setColors({
                hoursColor: "black",
                minutesColor: "black",
                secondsColor: "black",
                backgroundColor: "aliceblue"
            })
        } else {
            setNightButtonState({
                isNightMode: true
            })
            setModeBtnState({
                mode: "No_Action"
            })
            setColors({
                hoursColor: "aqua",
                minutesColor: "aqua",
                secondsColor: "aqua",
                backgroundColor: "cadetblue"
            })
        }
    }

    const handleResetClick = () => {
        const gmt = props.GMT - 2;
        
        const startDate = init(gmt);

        setTime({
            hours: startDate.hours,
            minutes: startDate.minutes,
            seconds: startDate.seconds,
            mode: "ST"
        });
        setColors({
            hoursColor: "black",
            minutesColor: "black",
            secondsColor: "black",
            backgroundColor: "aliceblue"
        })
        setNightButtonState({
            isNightMode: false
        })
        setModeBtnState({
            mode: "No_Action"
        })
    }

    const handleAmModeClick = () => {
        if (time.mode === "ST") {
            const { hours, mode } = fromStToAm(time.hours);
            setTime({
                hours: hours,
                minutes: time.minutes,
                seconds: time.seconds,
                mode: mode
            })
        } else {
            const hours = haveNiceDisplay({ hours: fromAmToSt(time.hours, time.mode) }, "ST").hours;
            setTime({
                hours: hours,
                minutes: time.minutes,
                seconds: time.seconds,
                mode: "ST"
            })


        }
    }

    return <div>
        <div className={styles.watch}>
            <div className={styles.screen} style={{ backgroundColor: colors.backgroundColor }}>
                <div className={styles.topScreen} style={{ color: colors.secondsColor }}>
                    {time.mode}
                </div>
                <div className={styles.bottomScreen}>
                    <div className={styles.hours}>
                        <div className={styles.hoursDisplayer}>
                            <div className={styles.hoursDisplay} style={{ color: colors.hoursColor }}>
                                {time.hours}
                            </div>
                        </div>
                    </div>
                    <div className={styles.firstSpace}>
                        <div className={styles.firstSpaceDisplayer}>
                            <div className={styles.firstSpaceDisplay} style={{ color: colors.secondsColor }}>
                                :
                            </div>
                        </div>
                    </div>
                    <div className={styles.minutes}>
                        <div className={styles.minutesDisplayer}>
                            <div className={styles.minutesDisplay} style={{ color: colors.minutesColor }}>
                                {time.minutes}
                            </div>
                        </div>
                    </div>
                    <div className={styles.secondSpace}>

                    </div>
                    <div className={styles.seconds}>
                        <div className={styles.secondsDisplayer}>
                            <div className={styles.secondsDisplay} style={{ color: colors.secondsColor }}>
                                {time.seconds}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className={styles.modeButton} onClick={handleModeClick}>

            </button>
            <button className={styles.increaseButton} onClick={handleIncreaseClick}>

            </button>
            <button className={styles.nightModeButton} onClick={handleNightModeClick}>

            </button>
            <button className={styles.resetButton} onClick={handleResetClick}>

            </button>
            <button className={styles.amModeButton} onClick={handleAmModeClick}>

            </button>

        </div>
        <div className={styles.GMT}>
            GMT {props.GMT < 0 ? props.GMT : "+" + props.GMT}
        </div>
    </div>
}

export default Watch;
