import { useEffect, useState } from "react";

export default function Country() {
  return (
    <div>
      <GetCountryData />
    </div>
  );
}

function GetCountryData() {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState("cyprus");

  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await fetch(`https://restcountries.com/v2/name/${country}`);
        if (!res.ok) throw new Error("Something wrong with API");
        const json = await res.json();

        setData(json[0]);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchCountry();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="country">
      <img src={data.flag} alt={data.name} className="country__img" />
      <div className="country__data">
        <h3 className="country__name">{data.name}</h3>
        <h4 className="country__region">{data.region}</h4>

        <p className="country__row">
          <span>👫</span>
          {data.population?.toLocaleString()}
        </p>
        <p className="country__row">
          <span>🗣️</span>
          {data.languages?.[0]?.name}
        </p>
        <p className="country-row">
          <span>💰</span>
          {data.currencies?.[0]?.name}
        </p>
      </div>
    </div>
  );
}
