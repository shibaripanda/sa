import { Center, Divider, Grid, Group, Space, Table, Text } from "@mantine/core";
import { Component } from "react";

export class WarrantyOrderPrint extends Component {

    constructor(props){
        super(props)
        this.data = props.data
        this.user = props.user
        this.service = props.service
        this.text = props.text
        this.leng = props.leng
        this.dataText = props.service.serviceDocuments.find(item => item.name === 'NewOrderPrint').data
    }

    dataForTable(){
      const res = [
      ]
      for(const i in this.data){
        if(i === '_DeviceBlocked_'){
          res.push(
            <Table.Tr key={i}>
              <Table.Th w={250}>{this.text.device[this.leng]}</Table.Th>
              <Table.Td>{this.data[i]}</Table.Td>
            </Table.Tr>
          )
        }
        else if(i[0] !== '_' && !['createdAt', 'updatedAt'].includes(i) && this.data[i]){
          res.push(
            <Table.Tr key={i}>
              <Table.Th w={250}>{i}</Table.Th>
              <Table.Td>{this.data[i]}</Table.Td>
            </Table.Tr>
          )
        }
      }
      if(this.service.subAddress){
        res.push(
          <Table.Tr key={this.text.changeAddressSubService[this.leng]}>
            <Table.Th w={250}>{this.text.changeAddressSubService[this.leng]}</Table.Th>
            <Table.Td>{this.service.subAddress}</Table.Td>
          </Table.Tr>
        )
      }
      if(this.service.subContact){
        res.push(
          <Table.Tr key={this.text.changeContactSubService[this.leng]}>
            <Table.Th w={250}>{this.text.changeContactSubService[this.leng]}</Table.Th>
            <Table.Td>{this.service.subContact}</Table.Td>
          </Table.Tr>
        )
      }
      if(this.service.subWorkTime){
        res.push(
          <Table.Tr key={this.text.changeTimeSubService[this.leng]}>
            <Table.Th w={250}>{this.text.changeTimeSubService[this.leng]}</Table.Th>
            <Table.Td>{this.service.subWorkTime}</Table.Td>
          </Table.Tr>
        )
      }
      res.push(
        <Table.Tr key={this.text.manager[this.leng]}>
          <Table.Th w={250}>{this.text.manager[this.leng]}</Table.Th>
          <Table.Td>{this.user.name ? this.user.name : this.user.email}</Table.Td>
        </Table.Tr>
      )
      if(this.service.dataService){
        res.push(
          <Table.Tr key={this.text.changeInfoMainService[this.leng]}>
            <Table.Th w={250}>{this.text.changeInfoMainService[this.leng]}</Table.Th>
            <Table.Td>{this.service.dataService}</Table.Td>
          </Table.Tr>
        )
      }
      return res
    }

    orderWorksPanel(order){

      if(order._work_.length){
  
        const title = (data) => { 
          return data.work + data.parts.filter(item => item.link === 'mix').map(item => ' ' + item.part).join(' / ')
        }
        const cost = (data) => { 
          return data.parts.filter(item => ['mix', 'hide'].includes(item.link)).reduce((acc, item) => acc + item.cost, data.cost)
        }
        const varanty = (data) => {
          return [...data.parts
            .filter(item => ['mix', 'hide'].includes(item.link) && item.varanty)
            .map(item => item.varanty), data.varanty ? data.varanty : 0]
            .sort((a, b) => b - a)
        }
        const partsClient = (work) => {
          if(work.parts.filter(item => 'apart' === item.link).length){
            return (
              work.parts.filter(w => 'apart' === w.link).map(part => 
                <Table.Tr>
                  <Table.Td>
                    {part.part ? part.part : '--'}
                  </Table.Td>
                  <Table.Td>
                    <Center>
                      {part.varanty ? part.varanty : 0}
                    </Center>
                  </Table.Td>
                  <Table.Td>
                    <Center>
                      {part.cost ? part.cost : 0}
                    </Center>
                  </Table.Td>
                </Table.Tr>
              )
            )
          }
        }
        const totalCost = () => {
          let total = order._work_.reduce((acc, item) => acc + item.cost, 0)
          for(const i of order._work_){
            total = total + i.parts.reduce((acc, item) => acc + item.cost, 0)
          }
          return total
        }
        
        
        return (
          <div>
            <Space h='xs'/>
            <Grid>
              <Grid.Col span={12}>
                <Space h='xs'/>
                <Table border="1" withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
                <Table.Tbody>
                <Table.Tr>
                    <Table.Td>
                      <Center>
                        {this.text.servOrPart[this.leng]}
                      </Center>
                    </Table.Td>
                    <Table.Td>
                      <Center>
                        {this.text.varanty[this.leng]}
                      </Center>
                    </Table.Td>
                    <Table.Td>
                      <Center>
                        {this.text.cost[this.leng]}
                      </Center>
                    </Table.Td>
                  </Table.Tr> 
                  {order._work_.map(work =>
                    <>
                      <Table.Tr>
                        <Table.Td width={'70%'}>
                          {title(work)}
                        </Table.Td>
                        <Table.Td width={'15%'}>
                          <Center>
                            {varanty(work)}
                          </Center>
                        </Table.Td>
                        <Table.Td width={'15%'}>
                          <Center>
                            {cost(work)}
                          </Center>
                        </Table.Td>
                        {/* <Table.Td width={'10%'}>
                          <Center>
                            {newWorkOld(work)}
                          </Center>
                        </Table.Td> */}
                      </Table.Tr>
                      {partsClient(work)}
                    </>
                    )
                  }
                  <Table.Tr>
                    <Table.Td>
                    </Table.Td>
                    <Table.Td>
                    </Table.Td>
                    <Table.Td>
                      <Center>
                        {totalCost()}
                      </Center>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
                </Table>
              </Grid.Col>
            </Grid>
            <Space h='sm'/>
          </div>
        )
        
      }
    }

    render() {
      return (
        <div ref={this.props.innerRef} style={{margin: '2vmax'}}>

          <Group justify="center" gap="xl" style={{marginRight: '1vmax', marginLeft: '1vmax'}}>
            <Text fw={700} size="sm" className="perenos">{this.dataText.docTitle}</Text> #
            <Text fw={700} size="sm">{this.data._orderServiceId_}</Text>
          </Group>

          <Group justify="space-between" gap="xl" style={{marginRight: '1vmax', marginLeft: '1vmax'}}>
            <Text size="sm">{this.service.name} {this.service.subName}</Text>
            <Text size="sm">{new Date(this.data.createdAt).toLocaleDateString([`${this.leng}`, "en"])} {new Date(this.data.createdAt).toLocaleTimeString([`${this.leng}`, "en"]).slice(0, -3)}</Text>
          </Group>

          <hr></hr>

          <Grid>
            <Grid.Col span={11.5}>
              <Table border="1" withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
                <Table.Tbody>
                  {this.dataForTable()}
                </Table.Tbody>
              </Table>
            </Grid.Col>
            <Grid.Col span={0.5}>
              <Center>
                <div className='vertical'>
                  <span><b><font size="6">{this.data._orderServiceId_}</font></b></span>
                </div>
              </Center>
            </Grid.Col>
          </Grid>

          {this.orderWorksPanel(this.data)}

          <Center><Text td="underline" fw={700} size="sm" className="perenos">{this.dataText.docTitleListRules}</Text></Center>

          <Text size="xs" className="perenos">
            {this.dataText.rules}
          </Text>

          <Space h={'lg'}></Space>

          <Center><Text fw={700} size="sm" className="perenos">{this.dataText.extraRules}</Text></Center>

          <Space h={'lg'}></Space>

          <Group justify="space-between" style={{marginRight: '4vmax', marginLeft: '4vmax'}}>
            <div>
              <Divider color='grey' my="xs" />
              <Text fw={700} size="sm" className="perenos">{this.text.signClient[this.leng]}</Text>
            </div>
            <div>
              <Divider color='grey' my="xs" />
              <Text fw={700} size="sm" className="perenos">{this.text.signManager[this.leng]}</Text>
            </div>
          </Group>
          
        </div>
      )
    }
  }