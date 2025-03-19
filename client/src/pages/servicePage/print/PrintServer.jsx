import { useReactToPrint } from "react-to-print"
import React, { useRef } from "react"
import { NewOderPrint } from "./printDocuments/NewOderPrint"
import { Button } from "@mantine/core"
import { WarrantyOrderPrint } from "./printDocuments/WarrantyOrderPrint"

export const PrintServer = (props) => {

  console.log(props)

  const documentForPrint = () => {
    if(props.data._printDocument_ === 'NewOderPrint'){
      return <NewOderPrint innerRef={contentRef} {...props}/>
    }
    else if(props.data._printDocument_ === 'WarrantyOrderPrint'){
      return <WarrantyOrderPrint innerRef={contentRef} {...props}/>
    }
  }

  const cancelPrint = () => {
    if(props.data._printDocument_ === 'WarrantyOrderPrint'){
      return (
        <Button variant="default"
          onClick={() => {
            props.openedPrintHandlers.close()
          }}  
          style={{width: 375, marginRight: '1.7vmax', marginBottom: '1vmax'}}>
            {props.text.cancelPrint[props.leng]}
        </Button>
      )
    }
  }

  const contentRef = useRef(null)
  const handlePrint = useReactToPrint({ contentRef })

  return (
    <div>
      <div style={{textAlign: 'center', marginTop: '1.7vmax'}}>

        <Button variant="default" 
          onClick={() => {
            props.openedPrintHandlers.close()
            props.openedClosePrintHandlers.close()
          }}  
          style={{width: 375, marginRight: '1.7vmax', marginBottom: '1vmax'}}>
            {props.text.cancel[props.leng]}
        </Button>

        {cancelPrint()}

        <Button color="green" autoFocus={true} type="primary" style={{width: 375, marginBottom: '1vmax'}} 
          onClick={() => {
            handlePrint()
            props.openedPrintHandlers.close()
            }}>
              {props.text.print[props.leng]}
        </Button>

      </div>
      <div style={{ marginLeft: '1.7vmax' }}>
        {documentForPrint()}
      </div>
    </div>
  )
}