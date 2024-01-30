import React, { useState, useEffect, useCallback } from 'react'
import StopWatchButton from './StopWatchButton'

export function formatTime(time: number): string {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');
    if (hours > 0) {
        const formattedHours = hours.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    }
    const formattedTime = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    return formattedTime;
}

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [lapTimes, setLapTimes] = useState<number[]>([]);

    const handleReset = useCallback(() => {
        setTimerOn(false); 
        setTime(0); 
        setLapTimes([]);
      }, []);
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (timerOn) {
            interval = setInterval(() => setTime(time => time + 1), 10)
        }

        return () => {clearInterval(interval)} /
    }, [timerOn])

    return(
        <div className='stopwatch'>
            <h1 className='stopwatch-title'>StopWatch</h1>
            <div className='stopwatch-content'>
                <div className='stopwatch-buttons'>
                    <StopWatchButton type={'start'} onClick={() => setTimerOn(true)}></StopWatchButton>
                    <StopWatchButton type={'stop'} onClick={() => setTimerOn(false)}></StopWatchButton>
                    <StopWatchButton type={'lap'} onClick={() => setLapTimes([...lapTimes, time])} timerOn={timerOn} lapTimes={lapTimes}></StopWatchButton>
                    <StopWatchButton type={'reset'} onClick={handleReset} time={time}></StopWatchButton>
                </div>
                <div className='stopwatch-time'>
                    <p>{formatTime(time)}</p>
                    {lapTimes.length > 0 && (
                        <div className='stopwatch-laptimes'>
                            <p>Lap times</p>
                            <ul>
                                {lapTimes.map((lapTime, index) => {
                                    return <li key={index}>{(index + 1)+'.'} {formatTime(lapTime)}</li>
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}