import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
    const [fetchData, setFetchData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [ratingCount, setRatingCount] = useState(0);
    const [step, setStep] = useState("zero");

    const fetchDataFromAPI = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setFetchData(data);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const filterMensData = (data) => {
        return data.filter((item) => item.title.includes("Men"));
    };

    const sortDataByPrice = (data) => {
        return data.sort((a, b) => a.price - b.price);
    };

    const countHighRatings = (data) => {
        const count = data.reduce((acc, item) => {
            if (item.rating.rate >= 4.1) {
                acc++;
            }
            return acc;
        }, 0);
        setRatingCount(count);
        Cookies.set("count", count, { expires: 7 });
        return count;
    };

    const handleStepOne = async () => {
        const data = await fetchDataFromAPI();
        const mensData = filterMensData(data);
        const sortedMensData = sortDataByPrice(mensData);
        countHighRatings(mensData);
        setFilteredData(mensData);
        setSortedData(sortedMensData);
        setStep("one");
    };

    const handleRemoveContent = () => {
        setFetchData([]);
        setFilteredData([]);
        setSortedData([]);
        setRatingCount(0);
        setStep("zero");
        Cookies.remove("count");
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
                    <button onClick={() => setStep("two")}>Fetched!</button>
                </div>
            )}
            {step === "two" && (
                <div className="content">
                    <button onClick={handleRemoveContent}>Remove Content</button>
                    <h2>All Fetched Data</h2>
                    <ul>
                        {fetchData.map((item) => (
                            <li key={item.id}>{item.title}</li>
                        ))}
                    </ul>
                    <h2>Filtered Data (Men)</h2>
                    <ul>
                        {filteredData.map((item) => (
                            <li key={item.id}>{item.title}</li>
                        ))}
                    </ul>
                    <h2>Sorted Data by Price</h2>
                    <ul>
                        {sortedData.map((item) => (
                            <li key={item.id}>{`$${item.price.toFixed(2)}`}</li>
                        ))}
                    </ul>
                    <h2>Count of Ratings >= 4.1</h2>
                    <p>{ratingCount}</p>
                </div>
            )}
        </>
    );
}

export default App;
