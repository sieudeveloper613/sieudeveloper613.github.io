import React from "react";
import ProcedureProvider from "./ProcedureProvider";
import ProcedureArea from "./components/ProcedureArea";
import ProcedureFormArea from "./components/ProcedureFormArea";

interface IProcedurePage {
  // none of object
}

const ProcedurePage = ({ }: IProcedurePage) => {
  return (
    <ProcedureProvider>
      <ProcedureArea />
      <ProcedureFormArea />
    </ProcedureProvider>
  )
}

export default ProcedurePage