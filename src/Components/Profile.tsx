

import { useContext } from 'react';
import { ChallengesContext } from "./Contexts/ChallengeContext";
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer} >
            <img src="https://github.com/Gardiano.png" alt="photo" />
            <div>
                <strong> João Paulo Gardiano </strong>
               
                <p> 
                    <img src="Up.svg" alt="level" style={{width: '13px', height:'13px'}} />
                    Level {level}
                </p>
            </div>
        </div>
       
    )
}