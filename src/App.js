import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useEffect, useState, useRef } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./App.css";
import Radium, { StyleRoot } from "radium";

const App = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  // const rowData = [
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 },
  // ];
  const onButtonClick = (e) => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(", ");
    alert(`Selected cars : ${selectedDataStringPresentation}`);
  };
  const style = {
    // Adding media querry..
    width: "500px",
    height: "600px",

    "@media (max-width: 550px)": {
      height: "600px",
      width: "350px",
    },
  };
  return (
    <StyleRoot>
      <div className="app">
        <div className="ag-theme-alpine" style={style}>
          <button onClick={onButtonClick} className="app__button">
            Get selected rows
          </button>
          <AgGridReact ref={gridRef} rowData={rowData} rowSelection="multiple">
            <AgGridColumn
              field="make"
              sortable={true}
              filter={true}
              checkboxSelection={true}
            ></AgGridColumn>
            <AgGridColumn
              field="model"
              sortable={true}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="price"
              sortable={true}
              filter={true}
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </StyleRoot>
  );
};

export default Radium(App);
