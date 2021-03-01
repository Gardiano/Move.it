
import { createContext, ReactNode, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import challenges from '../../../challenges.json';
import { LevelUpModal } from '../LevelUpModal';


interface Challenge {
    type:'body' | 'eye'
    description: string
    amount: number
}

interface ChallengesContextData {
    level: number    
    currentExperience: number
    challengesCompleted: number
    experienceToNextLevel: number    
    activeChallenge: Challenge
    levelUp: () => void
    startNewChallenge: () => void
    resetChallenge: () => void
    completedChallenger: () => void
    closeModal: () => void
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number, 
    challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData );

export function ChallengesProvider( { children, ...rest } : ChallengesProviderProps ) {
 
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompeted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
       Cookies.set( 'level', level.toString());
       Cookies.set( 'currentExperience', currentExperience.toString());
       Cookies.set( 'challengesCompleted', challengesCompleted.toString());
    },[level, currentExperience, challengesCompleted]);

    // inserindo notificações na páguna;
    useEffect(() => {
        Notification.requestPermission();
    } ,[])

    function levelUp() {
        setLevel(level + 1);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengesIndex];

        setActiveChallenge(challenge);

       new Audio('notification.mp3').play();

        if(Notification.permission === 'granted') {
            new Notification('Move.it challenge', {
                body: `Ganhe ${challenge.amount} xp `
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completedChallenger() {
       if(!activeChallenge) {
            return;
       }

       const { amount } = activeChallenge;

       let finalExperience = currentExperience + amount;

       if( finalExperience >= experienceToNextLevel ) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
       }

       setCurrentExperience(finalExperience);
       setActiveChallenge(null);
       setChallengesCompeted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
        value={{
            level, 
            levelUp,            
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completedChallenger,
            closeModal
        }}>
            {children}

           { modalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    );
}