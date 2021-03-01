
import { useContext } from "react";
import styles from "../styles/components/Countdown.module.css";
import { CountdownContext } from '../Components/Contexts/CountdownContext';

export function Countdown() {  
  const { minutes,
    seconds, 
    hasFinished, 
    isActive, 
    startCountdown, 
    leavingCountdown} = useContext(CountdownContext);
    
  // split.prototype array - divide o caracteres dentro do array;
  // padStart - verifica se a string tem o numero de caracteres suficientes;
  // Ex: padStart('numero de carateres', 'caracter informado');
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");
  
  return (
    <div>
      <div className={styles.CountdownContainer}>
        {/* minutos */}
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        {/* segundos */}
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
        disabled
        className={styles.countdownButton}>
          Ciclo finalizado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={leavingCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
