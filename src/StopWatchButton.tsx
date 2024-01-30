import React from 'react'

const maxLaps = 25;

type StopWatchButtonProps = {
    type: 'start' | 'stop' | 'lap' | 'reset';
    onClick?: () => void;
    timerOn?: boolean;
    time?: number;
    lapTimes?: number[];
};
  
  export default function StopWatchButton({ type, onClick, timerOn, time, lapTimes }: StopWatchButtonProps) {
    let buttonText, tabIndex;
    switch(type) {
        case 'start':
            buttonText = 'Start';
            tabIndex = 1;
            break;
        case 'stop':
            buttonText = 'Stop';
            tabIndex = 2;
            break;
        case 'lap':
            buttonText = 'Record Lap';
            tabIndex = 3;
            break;
        case 'reset':
            buttonText = 'Reset';
            tabIndex = 4;
            break;
        default: 
        buttonText = '';
        tabIndex = 0;
    }
    const isLapDisabled = !timerOn || (lapTimes && lapTimes.length === 25);
    const isResetDisabled = time === 0;
    return(
        <button 
            onClick={onClick} 
            aria-label={type}
            tabIndex={tabIndex}
            disabled={(type === 'lap' && isLapDisabled) || (type === 'reset' && isResetDisabled)}
            {lapTimes && lapTimes.length === maxLaps && timerOn && type === 'lap' ? "Maximum laps reached" : buttonText}
        </button>
    )
}