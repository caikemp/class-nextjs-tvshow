import axios from "axios";
import Error from "next/error";
import Head from "next/head";
import Thumbnail from "../../components/thumbnail";

const ShowDetails = ({ shows, country, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const renderShows = () => {
    return shows?.map((shotItem, key) => {
      let { show } = shotItem;
      return (
        <li key={key}>
          <Thumbnail
            imageUrl={show.image?.medium}
            caption={show.name}
            as={`/${country}/${show.id}`}
            href="/[country]/[showId]"
          />
        </li>
      );
    });
  };

  return (
    <>
      <Head>
        <title>Shows page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul className="tvshows">{renderShows()}</ul>
      <style jsx>{`
        .tvshows > :global(li) {
          text-align: center;
          padding: 10px;
          display: inline-flex;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const country = context.query.country || "us";

    const res = await axios.get(
      `https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
    );

    return { props: { shows: res.data, country } };
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
