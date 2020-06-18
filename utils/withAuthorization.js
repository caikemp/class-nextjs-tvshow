import Router from "next/router";
import cookies from "nookies";
import { Component } from "react";

const authenticate = (context) => {
  const { token } = cookies.get(context);
  console.log("context", { context });

  cookies.set(
    context,
    "plannedRoute",
    JSON.stringify({ as: context.asPath, href: context.pathname }),
    { path: "/" }
  );

  if (context.req && !token) {
    context.res.writeHead(302, { Location: "/signin" });
    context.end();
    return;
  }

  if (!token) {
    Router.push("/signin");
  }

  return token;
};

const isAuthenticated = (context) => {
  const { token } = cookies.get(context);

  return !!token;
};

const withAuthorization = (WrapperComponent) => {
  return class extends Component {
    state = {
      token: null,
    };

    componentDidMount() {
      this.setState({ token: authenticate(this.context) });
    }

    render() {
      return <WrapperComponent {...this.props} token={this.state.token} />;
    }
  };
};

export { withAuthorization, isAuthenticated };
