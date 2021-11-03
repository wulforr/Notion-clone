import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar/Navbar";
import TaskBoard from "../components/TaskBoard/TaskBoard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Airtribe notion clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <h1>Task List</h1>
          <div className={styles.homepageParagraph}>
            Use this template to track the status of day-to-day support tasks.
          </div>
          <div className={styles.homepageParagraph}>
            Tasks are assigned to one or more people and can include priority,
            tags, and a due date.
          </div>
        </div>

        <TaskBoard />
      </main>
    </div>
  );
}
