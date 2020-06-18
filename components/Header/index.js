import Link from "next/link";
import { useRouter } from "next/router";
import cookies from "nookies";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../utils/withAuthorization";

const COUNTRIES = [
  { label: "us", name: "United States" },
  { label: "br", name: "Brazil" },
];
const Header = () => {
  const router = useRouter();
  const [country, setCountry] = useState(router.query.country);

  const handleChange = (e) => {
    setCountry(e.target.value);
    router.push(`/[country]`, `/${e.target.value}`);
  };

  const handleSignout = () => {
    cookies.destroy(null, "token");
  };

  useEffect(() => {
    country &&
      cookies.set(null, "defaultCountry", country, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
  }, [country]);

  const renderContries = () =>
    COUNTRIES.map((country) => (
      <option key={country.label} value={country.label}>
        {country.name}
      </option>
    ));

  return (
    <div className="header">
      <select value={country} onChange={handleChange}>
        {renderContries()}
      </select>

      {isAuthenticated() && (
        <Link href="/[country]" as={`/${country}`}>
          <a onClick={handleSignout}>Sign out</a>
        </Link>
      )}

      <style jsx>{`
        .header {
          color: white;
          text-align: center;
          padding: 20px;
          background: #000;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }

        .header > :global(a) {
          color: white;
          padding: 0 10px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};
export default Header;
