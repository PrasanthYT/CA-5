import React, { useEffect, useState } from "react";

function App() {
  const [fetchData, setFetchData] = useState([]);
  const [step, setStep] = useState("zero");

  const response = async () => {
    await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setFetchData(json));
  };

  const handleStepOne = () => {
    response();
    setStep("one");
  };

  const handleStepTwo = () => {
    setStep("two");
  };

  const handleRemoveContent = () => {
    setFetchData([]);
    setStep("zero");
  };

  return (
    <>
      {step === "zero" && (
        <div className="button">
          <button onClick={handleStepOne}>Fetch Data</button>
        </div>
      )}
      {step === "one" && (
        <div className="button">
          <button onClick={handleStepTwo}>Fetched!</button>
        </div>
      )}
      {step === "two" ? (
        <div className="content">
          <button onClick={handleRemoveContent}>Remove Content</button>
          {fetchData &&
            fetchData.map((item) => {
              return (
                <ul key={item.id}>
                  <li>{item.title}</li>
                </ul>
              );
            })}
        </div>
      ) : (
        <p>Fetching!</p>
      )}
    </>
  );
}

export default App;
