
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../Components/ChallengeBox';
import { CompletedChallengers } from '../Components/CompletedChallengers';
import { CountdownProvider } from '../Components/Contexts/CountdownContext';
import { Countdown } from '../Components/Countdown';
import { ExperienceBar } from "../Components/ExperienceBar";
import { Profile } from '../Components/Profile';

import styles from '../styles/pages/Home.module.css';

import { ChallengesProvider } from '../Components/Contexts/ChallengeContext';

interface HomeProps {
  level: number,
  currentExperience: number, 
  challengesCompleted: number
}

export default function Home( props: HomeProps ) {
  return (
  <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
  >   
    <div className={styles.Container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>
      <ExperienceBar />

      <CountdownProvider>   
        <section>
          {/* left side page contents */}
          <div>
            <Profile />
            <CompletedChallengers />
            <Countdown />            
          </div>

          {/* right side page contents */}
          <div className={styles.rightSidePage}>
            <ChallengeBox />            
          </div>
        </section>
      </CountdownProvider>          
    </div>
  </ChallengesProvider>
  
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const  { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
