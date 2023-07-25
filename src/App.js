import { useState } from "react";
import { ageCalculator, removeR } from "./utils";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const members = csvRows
      .map((row) => {
        const rowArray = row.split(",");

        const member = csvHeader.reduce((member, header, index) => {
          header = removeR(header);
          rowArray[index] = removeR(rowArray[index]);

          if (rowArray[index] === undefined) {
            return {};
          }

          if (header === "Name") {
            member.name = rowArray[index];
          } else if (header === "Birthday") {
            const [year, month, day] = rowArray[index]
              .split("/")
              .map((val) => Number(val));

            member.birthday = {
              year,
              month,
              day,
            };
          } else if (header === "Registration") {
            const [year, month, day] = rowArray[index]
              .split("/")
              .map((val) => Number(val));

            member.startDate = {
              year,
              month,
              day,
            };
          }
          return member;
        }, {});

        return member;
      })
      .filter((member) => Object.entries(member).length);

    setArray(ageCalculator(members));
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
        <div className="color-description-wrapper">
          <b>About Color</b>
          <div className="color-description-ul">
            <ul>
              <li>Green: have more than a year until graduation</li>
              <li>Yellow: will graduate within a year</li>
              <li>Pink: already alumni but may be staying</li>
              <li>Grey: already alumni and graduated</li>
              <li>Red: invalid input</li>
            </ul>
          </div>
        </div>
      </div>

      <hr />
      <br />

      <form>
        <input
          type="file"
          id="csvFileInput"
          accept=".csv"
          onChange={handleOnChange}
        />
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
              <td>
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
