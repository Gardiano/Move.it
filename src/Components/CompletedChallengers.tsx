
import { useContext } from 'react';
import styles from '../styles/components/CompletedChallengers.module.css';
import { ChallengesContext } from './Contexts/ChallengeContext';

export function CompletedChallengers() {

    const { challengesCompleted } = useContext(ChallengesContext);

    return (
        <div className={styles.completedChallengersContainer} >
            <span> Desafios Completos </span>
            <span> {challengesCompleted} </span>
        </div>
    );
}