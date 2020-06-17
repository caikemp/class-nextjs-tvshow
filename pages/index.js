import Head from "next/head";
import { Router } from "next/router";

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>This is my homepage!</div>
    </div>
  );
};

Home.getInitialProps = (context) => {
  const country = context.query.country || "us";

  process.browser
    ? Router.replace("/[country]", `${country}`)
    : context.res.writeHead(302, { Location: `/${country}` });

  context.res.end();

  return {};
};

export default Home;
