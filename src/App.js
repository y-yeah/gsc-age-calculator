import { useState } from "react";
import { ageCalculator } from "./utils";
import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        if (header[header.length - 1] === "\r") {
          header = header.slice(0, header.length - 1);
        }
        if (header === "Name") {
          object.name = values[index];
        } else if (header === "Birthday") {
          const [year, month, day] = values[index].split("/");

          object.birthday = {};
          object.birthday.year = year;
          object.birthday.month = month;
          object.birthday.day = day;
        } else if (header === "Registration") {
          const [year, month, day] = values[index].split("/");

          object.startDate = {};
          object.startDate.year = year;
          object.startDate.month = month;
          object.startDate.day = day;
        }
        return object;
      }, {});
      return obj;
    });

    setArray(ageCalculator(array));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <main>
      <h1>GSC Age Calculator</h1>
      <div>
        <p>
          Create a CSV file (.csv) like below and upload it. You can make a CSV
          using the app such as Excel and Numbers.
        </p>
        <div>
          <img src="/sample.png" alt="sample" width="500px" />
        </div>
      </div>

      <hr />

      <form>
        <input
          type="file"
          id="csvFileInput"
          accept=".csv"
          onChange={handleOnChange}
        />
        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Calculate!
        </button>
      </form>

      <br />

      <table>
        <thead>
          <tr key="header">
            <th key="name">Name</th>
            <th key="status">Status</th>
          </tr>
        </thead>

        <tbody>
          {array.map((item, i) => (
            <tr key={i}>
              {Object.values(item).map((val) => (
                <td key={val}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
