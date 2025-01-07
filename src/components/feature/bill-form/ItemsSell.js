import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import cx from "classnames";
import { Button, Typography } from "@mui/material";
import SearchableDD from "../../common/SearchableDD/SearchableDD";
// const formValues = {
//   buyerName: "",
//   buyerAddress: "",
//   buyerGst: "",
//   buyerState: "",
//   //   dated: DATED_OPTIONS[1],
//   items: {
//     1: {
//       sNo: 1,
//     },
//     2: {
//       sNo: 2,
//     },
//     3: { sNo: 3 },
//   },
// };
const ItemsSell = () => {
  const [rowFields, setRowFields] = useState([{ sNo: 1, date: "22-3-24" }]);
  const handleAddField = () => {
    setRowFields([...rowFields, { sNo: 2, date: "22-3-24" }]);
  };
  const handleRemoveLastRowField = () => {
    const updatedRows = rowFields.slice(0, rowFields.length - 1);
    setRowFields(updatedRows);
  };
  //   const handleChange = (index, event) => {
  //     const values = [...rowFields];
  //     values[index].value = event.target.value;
  //     setRowFields(values);
  //   };
  return (
    <>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          S. No.
        </strong>
        {/* <div className="pl-1">
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            value={formValues.items["1"].sNo}
          />
        </div> */}
      </Grid>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Date
        </strong>
        {/* <div className="pl-1">
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
        </div> */}
      </Grid>
      <Grid xs={3} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Description of Goods
        </strong>
        {/* <SearchableDD
        //   onChangeDDOption={handleOnChangeDatedDD}
        //   onInputChangeDDSearch={handleOnChangeDatedDDInput}
        //   ddOptions={productsDDOptions}
        /> */}
      </Grid>
      <Grid xs={2} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          HSN Code
        </strong>
        {/* <div className="pl-1">
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
        </div> */}
      </Grid>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Quantity
        </strong>
        {/* <div className="pl-1">
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            type="number"
          />
        </div> */}
      </Grid>
      <Grid xs={1} className="left-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Rate PMT
        </strong>
        {/* <div className="pl-1">
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
            type="number"
          />
        </div> */}
      </Grid>
      <Grid xs={3} className="left-border right-border">
        <strong className="flex bottom-border pb-1 justify-center w-full">
          Amount RS
        </strong>
        {/* <div className="pl-1">
          <input
            placeholder="Enter "
            className="outline-none block max-w-[100%]"
          />
        </div> */}
      </Grid>
      {rowFields.map((row, index) => {
        return (
          <>
            <Grid xs={1} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                  value={row.sNo}
                />
              </div>
            </Grid>
            <Grid xs={1} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                  value={row.date}
                />
              </div>
            </Grid>
            <Grid xs={3} className="left-border">
              {/* <SearchableDD
              //   onChangeDDOption={handleOnChangeDatedDD}
              //   onInputChangeDDSearch={handleOnChangeDatedDDInput}
              //   ddOptions={productsDDOptions}
              /> */}
            </Grid>
            <Grid xs={2} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                />
              </div>
            </Grid>
            <Grid xs={1} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                  type="number"
                />
              </div>
            </Grid>
            <Grid xs={1} className="left-border">
              <div className="pl-1">
                <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                  type="number"
                />
              </div>
            </Grid>
            <Grid xs={3} className="left-border right-border">
              <div className="pr-1 text-right">
                {/* <input
                  placeholder="Enter "
                  className="outline-none block max-w-[100%]"
                /> */}
                <strong>343444</strong>
              </div>
            </Grid>
          </>
        );
      })}
      <Grid
        xs={7}
        className="pl-1 form-border no-bottom-border no-right-border flex items-center gap-2"
      >
        <button onClick={handleAddField}>Add Row Fields</button>
        <button
          onClick={handleRemoveLastRowField}
          disabled={rowFields?.length <= 1}
        >
          Remove Last Row Fields
        </button>
      </Grid>
      <Grid
        xs={5}
        className="pl-1 pb-1 form-border no-bottom-border flex flex-col"
      >
        <strong>SGST</strong>
        <strong>CGST</strong>
        <strong>IGST</strong>
        <strong>Other Expenses</strong>
      </Grid>
    </>
  );
};
export default ItemsSell;
