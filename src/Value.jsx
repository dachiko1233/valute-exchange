import { useEffect, useState } from "react";

export default function Value() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFormCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function value() {
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

    if (fromCurrency === toCurrency) return setConverted(amount);

    value();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <h1>Currency Converter</h1>

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />

      <select
        value={fromCurrency}
        onChange={(e) => setFormCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GEL">GEL</option>
      </select>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
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
