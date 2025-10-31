import { useEffect, useState } from "react";

export default function App() {
  return (
    <div>
      <Valute />
    </div>
  );
}

function Valute() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFormCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [converted, setConverted] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function value() {
      if (fromCurrency === toCurrency) {
        setConverted(amount);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        if (!res.ok) throw new Error(`SomeThing wrong with API`);

        const data = await res.json();
        setConverted(data.rates[toCurrency]);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    value();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <h1>Currency Converter</h1>

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <select
        value={fromCurrency}
        disabled={isLoading}
        onChange={(e) => setFormCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GEL">GEL</option>
      </select>

      <select
        value={toCurrency}
        disabled={isLoading}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GEL">GEL</option>
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {amount} {fromCurrency} = {converted ?? "..."} {toCurrency}
        </p>
      )}
    </div>
  );
}
