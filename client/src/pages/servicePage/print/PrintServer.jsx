import { useReactToPrint } from "react-to-print"
import React, { useRef } from "react"
import { NewOderPrint } from "./NewOderPrint"

export const PrintServer = (props) => {

  console.log(props)

  const contentRef = useRef(null)
  const handlePrint = useReactToPrint({ contentRef })

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <NewOderPrint innerRef={contentRef} data={props}/>
    </div>
  )
}