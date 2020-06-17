import Head from "next/head";
import { Router } from "next/router";
import cookie from "nookies";

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
  const { defaultCountry } = cookie.get(context);
  const country = context.query.country || defaultCountry;

  process.browser
    ? Router.replace("/[country]", `${country}`)
    : context.res.writeHead(302, { Location: `/${country}` });

  context.res.end();

  return {};
};

export default Home;
