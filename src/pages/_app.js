import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
