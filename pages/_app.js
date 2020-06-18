import Header from "../components/Header";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx>{`
        @font-face {
          font-family: "raleway";
          src: url("/fonts/raleway/Raleway-Regular.ttf") format("truetype");
        }

        :global(.error) {
          color: red;
          padding: 10px;
          border: 1px solid red;
          margin: 10px 0;
        }

        :global(a) {
          color: white;
          text-decoration: none;
        }

        :global(form) {
          display: flex;
          width: 100%;
          flex-direction: column;
          text-align: center;
        }
        :global(input) {
          padding: 10px;
          margin: 0 0 10px;
          width: 100%;
          box-sizing: border-box;
        }
        :global(button) {
          padding: 10px;
          margin: 10px 0;
          cursor: pointer;
          background-color: blue;
          border: 2px solid blue;
          color: white;
        }
        :global(button:disabled) {
          background-color: grey;
          border: 2px solid grey;
          color: white;
        }
        :global(html) {
          font-family: "raleway";
          background-color: #333;
        }
        :global(ul) {
          margin: 0;
          list-style-type: none;
        }
      `}</style>
    </>
  );
};

export default MyApp;
