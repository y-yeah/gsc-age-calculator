import { useState } from "react";
import { ageCalculator, removeR } from "./utils";
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
        header = removeR(header);
        values[index] = removeR(values[index]);

        if (header === "Name") {
          object.name = values[index];
        } else if (header === "Birthday") {
          const [year, month, day] = values[index]
            .split("/")
            .map((val) => Number(val));

          object.birthday = {};
          object.birthday.year = year;
          object.birthday.month = month;
          object.birthday.day = day;
        } else if (header === "Registration") {
          const [year, month, day] = values[index]
            .split("/")
            .map((val) => Number(val));

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
      <h1>GSC Graduation Date Calculator</h1>
      <div>
        <p>
          Create a CSV file (.csv) like below and upload it. You can make a CSV
          using the app such as Excel and Numbers.
        </p>
        <div>
          <img src="/sample.png" alt="sample" className="sample-image" />
        </div>
        {/* <h3>Color</h3>
        <p>Green: have more than a year until becoming alumni</p>
        <p>Yellow: will become alumni within a year</p>
        <p>Grey: has become alumni and graduated</p>
        <p>red: invalid input</p> */}
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
            <th key="color">Color</th>
            <th key="name">Name</th>
            <th key="status">Status</th>
          </tr>
        </thead>

        <tbody>
          {array.map((item, i) => (
            <tr key={i}>
              <td className="color-circle-wrapper">
                <div
                  className="color-circle"
                  style={{ backgroundColor: item.color }}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
