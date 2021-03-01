
import { useContext } from "react";
import styles from "../styles/components/LevelUpModal.module.css";
import { ChallengesContext } from "./Contexts/ChallengeContext";

export function LevelUpModal() {
 const { level, closeModal } = useContext(ChallengesContext)

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header> {level} </header>

                <strong> Parabéns </strong>
                <p> Você alcançou um novo level. </p>

                <button type="button" onClick={closeModal}>
                    <img src="close.svg" alt="fechar modal" />
                </button>
            </div>
        </div>
    )
}