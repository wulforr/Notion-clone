import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar/Navbar";
import ContentEditable from "react-contenteditable";
import { useRef } from "react";
import TaskBoard from "../components/TaskBoard/TaskBoard";

export default function Home() {
  const text = useRef("sup");
  const editDivRef = useRef(null);

  const handleChange = (evt) => {
    text.current = evt.target.value;
  };

  const handleBlur = () => {
    console.log(text.current);
  };

  const setFocus = () => {
    console.log(editDivRef.current);
    editDivRef.current.el.current.focus();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Airtribe notion clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        {/* <h1
          contentEditable
          className={styles.title}
          onChange={(e) => console.log(e.currentTarget.innerHTML)}
          onInput={(e) => console.log(e.currentTarget.innerHTML, "input")}
          onBlur={(e) => console.log(e.currentTarget.innerHTML, "blur")}
        >
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1> */}
        <h1>Task List</h1>
        <div className={styles.homepageParagraph}>
          Use this template to track the status of day-to-day support tasks.
        </div>
        <div className={styles.homepageParagraph}>
          Tasks are assigned to one or more people and can include priority,
          tags, and a due date.
        </div>

        <TaskBoard />

        <ContentEditable
          html={text.current}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={editDivRef}
        />
        <button onClick={setFocus}>Focus</button>
      </main>
    </div>
  );
}
