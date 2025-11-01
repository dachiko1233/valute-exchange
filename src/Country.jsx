import { useEffect, useState } from "react";

export default function Country() {
  return (
    <div>
      <GetCountryData country="cyprus" />
    </div>
  );
}

function GetCountryData({ country }) {
  const [mainCuntry, setMineCuntry] = useState(null);
  const [neighbourCountry, setNeighbourCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await fetch(`https://restcountries.com/v2/name/${country}`);
        if (!res.ok) throw new Error("Something wrong with API");
        const [data] = await res.json();

        setMineCuntry(data);
        const neighbourCode = data.borders?.[0];
        if (!neighbourCode) return;

        const res2 = await fetch(
          `https://restcountries.com/v2/alpha/${neighbourCode}`
        );
        if (!res2.ok) throw new Error("Neighbour not found");
        const data2 = await res2.json();
        setNeighbourCountry(data2);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchCountry();
  }, [country]);

  if (error) return <p>{error}</p>;
  if (!mainCuntry) return <p>Loading...</p>;

  return (
    <div className="country-flex">
      <CountryCard data={mainCuntry} />
      {neighbourCountry && (
        <CountryCard data={neighbourCountry} className="neighbour" />
      )}
    </div>
  );
}

function CountryCard({ data, className = "" }) {
  return (
    <article className={`country ${className}`}>
      <img className="country__img" src={data.flag} alt={data.name} />
      <div className="country__data">
        <h3 className="country__name">{data.name}</h3>
        <h4 className="country__region">{data.region}</h4>
        <p className="country__row">
          <span>👫</span> {(data.population / 1000000).toFixed(1)}M
        </p>

        <p className="country__row">
          <span>🗣️</span> {data.languages?.[0]?.name}
        </p>
        <p className="country__row">
          <span>💰</span> {data.currencies?.[0]?.name}
        </p>
      </div>
    </article>
  );
}
