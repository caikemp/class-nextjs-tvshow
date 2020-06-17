const CustomError = ({ statusCode }) => {
  return <div>{statusCode} | This is a error</div>;
};

CustomError.getInitialProps = ({ err, res }) => {
  return { statusCode: res ? res.statusCode : err ? err.statusCode : 404 };
};

export default CustomError;
