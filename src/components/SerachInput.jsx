import React, { useState } from "react";
const jsonp = require("jsonp");

function SerachInput() {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const clickOnHint = (e) => {
    setWordEntered(e.target.value.split(". ").slice(1).join(" "));
    setFilteredData([]);
  };

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    const citiesArray = [];
    setWordEntered(searchWord);
    jsonp(
      `https://kladr-api.ru/api.php?query=${searchWord}&contentType=city&limit=10`,
      null,
      (err, data) => {
        if (!err) {
          data.result.map((value) => {
            if (value.id !== "Free") {
              citiesArray.push({
                id: value.id,
                name: `${value.typeShort}. ${value.name}`,
              });
            }
            return value;
          });
        }
        setFilteredData(citiesArray.sort());
      }
    );

    const newFilter = citiesArray.filter((value) => {
      return value.name.toUpperCase().includes(searchWord.toUpperCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="search">
      <div className="search-input">
        <input
          type="text"
          placeholder="Поиск..."
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length !== 0 && (
        <div className="search-result">
          {filteredData.map((value) => {
            return (
              <option
                onClick={clickOnHint}
                value={value.name}
                className="search-result-item"
                key={value.id}
                style={{ paddingLeft: "15px" }}
              >
                {value.name}
              </option>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default SerachInput;
