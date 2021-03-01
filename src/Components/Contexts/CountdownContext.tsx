
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengeContext';

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
    minutes: number
    seconds: number
    hasFinished: boolean
    isActive: boolean
    startCountdown: () => void
    leavingCountdown: () => void
}

interface CountdowProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData );

export function CountdownProvider ( {children} : CountdowProviderProps ) {

    // useContext;
  const { startNewChallenge } = useContext(ChallengesContext);

  // 25 minutos * 60 segundos - repesenta 25 minutos em segundos;
  const [time, setTime] = useState(25 * 60);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [isActive, setisActive] = useState(false);
  const [hasFinished, sethasFinished] = useState(false);

  function startCountdown() {
    setisActive(true);
  }

  function leavingCountdown() {
    clearTimeout(countdownTimeout);
    setisActive(false);
    sethasFinished(false);
    setTime(25 * 60);   
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      sethasFinished(true);
      setisActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  
   return (
       <CountdownContext.Provider 
       value ={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            leavingCountdown,
       }}>
            {children}
       </CountdownContext.Provider>
   ) 
}