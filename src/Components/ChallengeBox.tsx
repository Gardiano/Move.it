import { useContext } from "react";
import styles from "../styles/components/ChallengeBox.module.css";
import { ChallengesContext } from "./Contexts/ChallengeContext";
import { CountdownContext } from "./Contexts/CountdownContext";

export function ChallengeBox() {  
  const { activeChallenge, resetChallenge, completedChallenger } = useContext(ChallengesContext);
  const { leavingCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completedChallenger();
    leavingCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    leavingCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header> Ganhe {activeChallenge.amount} xp </header>

          <main>
            <img src={`${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong> 
            <p> {activeChallenge.description} </p>
          </main>
          
            <footer>
              <button 
                type="button"
                className={styles.challengeFailedButton}
                onClick={handleChallengeFailed}
                >              
                falhei
              </button>
              
              <button 
                type="button"
                className={styles.challengesucceedeButton}
                onClick={handleChallengeSucceeded}
                >              
                Completei
              </button>
            </footer>         
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="level-up.svg" alt="level-up" />
            Avance de nível completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}
