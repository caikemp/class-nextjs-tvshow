import { useRouter } from "next/router";
import { useState } from "react";
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

      <style jsx>{`
        .header {
          color: white;
          text-align: center;
          padding: 20px;
          background: #333;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};
export default Header;
