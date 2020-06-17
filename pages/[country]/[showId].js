import axios from "axios";
import HTMLReactParser from "html-react-parser";
import Head from "next/head";
// import Error from "next/error";
import Cast from "../../components/Cast";
import CustomError from "../_error";

const ShowDetails = ({ show, statusCode }) => {
  console.log(show);
  const { name, image, summary, _embedded } = show;

  if (statusCode) {
    return <CustomError statusCode={statusCode} />;
  }

  return (
    <>
      <Head>
        <title>Shows details - {name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="show-detail">
        <div
          className="show-detail-poster"
          style={{ backgroundImage: `url(${image.original})` }}
        ></div>
        <h1>{name}</h1>
        {HTMLReactParser(summary)}
        {_embedded.cast.length > 0 && <Cast casts={_embedded.cast} />}
        <style jsx>
          {`
            .show-detail-poster {
              min-height: 200px;
              background-size: cover;
            }
          `}
        </style>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { showId } = query;
  try {
    const res = await axios.get(
      `https://api.tvmaze.com/shows/${showId}?embed=cast`
    );

    return { props: { show: res.data } };
  } catch (error) {
    return {
      props: {
        show: {},
        error: true,
        statusCode: error.response ? error.response.status : 500,
      },
    };
  }
};

export default ShowDetails;
