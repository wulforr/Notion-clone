import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <div id="portal"></div>
    </div>
  );
}

export default MyApp;
