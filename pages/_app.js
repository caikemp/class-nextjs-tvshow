import Header from "../components/Header";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx>{`
        :global(ul) {
          margin: 0;
          list-style-type: none;
        }
      `}</style>
    </>
  );
};

export default MyApp;
