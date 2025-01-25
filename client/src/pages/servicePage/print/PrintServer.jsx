import { useReactToPrint } from "react-to-print"
import React, { useRef } from "react"
import { NewOderPrint } from "./printDocuments/NewOderPrint"
import { Button } from "@mantine/core"

export const PrintServer = (props) => {

  console.log(props)

  const documentForPrint = () => {
    if(props.data.printDocument === 'newOrderDocument'){
      return <NewOderPrint innerRef={contentRef} {...props}/>
    }
  }

  const contentRef = useRef(null)
  const handlePrint = useReactToPrint({ contentRef })

  return (
    <div>
      <div style={{textAlign: 'center', marginTop: '1.7vmax'}}>
        <Button color='red' onClick={props.openedPrintHandlers.close}  style={{width: 375, marginRight: '1.7vmax', marginBottom: '1vmax'}}>Отмена</Button>
        <Button color='green' autoFocus={true} type="primary" style={{width: 375, marginBottom: '1vmax'}} onClick={handlePrint}>Печать</Button>
      </div>
      <div style={{ marginLeft: '1.7vmax' }}>
        {documentForPrint()}
      </div>
    </div>
  )
}