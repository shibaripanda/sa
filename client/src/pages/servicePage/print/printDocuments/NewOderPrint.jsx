import { Center, Divider, Grid, Group, Space, Table, Text } from "@mantine/core";
import { Component } from "react";

export class NewOderPrint extends Component {

    constructor(props){
        super(props)
        this.data = props.data
        this.user = props.user
        this.service = props.service
        this.text = props.text
        this.leng = props.leng
        this.dataText = props.service.serviceDocuments.find(item => item.name === 'NewOrderPrint').data
    }

    textSizeTableItalic(text){
      console.log(text)
      return (
        <Text fs="italic" size='xs'>
          {text}
        </Text>
      )
    }
    textSizeTable(text){
      console.log(text)
      return (
        <Text size='xs'>
          {text}
        </Text>
      )
    }
    dataForTable(){
      const res = [
      ]
      for(const i in this.data){
        if(i === '_DeviceBlocked_'){
          res.push(
            <Table.Tr key={i}>
              <Table.Th w={250}>{this.textSizeTableItalic(this.text.device[this.leng])}</Table.Th>
              <Table.Td>{this.textSizeTable(this.data[i])}</Table.Td>
            </Table.Tr>
          )
        }
        else if(i[0] !== '_' && !['createdAt', 'updatedAt'].includes(i) && this.data[i]){
          res.push(
            <Table.Tr key={i}>
              <Table.Th w={250}>{this.textSizeTableItalic(i)}</Table.Th>
              <Table.Td>{this.textSizeTable(this.data[i])}</Table.Td>
            </Table.Tr>
          )
        }
      }
      if(this.service.subAddress){
        res.push(
          <Table.Tr key={this.text.changeAddressSubService[this.leng]}>
            <Table.Th w={250}>{this.textSizeTableItalic(this.text.changeAddressSubService[this.leng])}</Table.Th>
            <Table.Td>{this.textSizeTable(this.service.subAddress)}</Table.Td>
          </Table.Tr>
        )
      }
      if(this.service.subContact){
        res.push(
          <Table.Tr key={this.text.changeContactSubService[this.leng]}>
            <Table.Th w={250}>{this.textSizeTableItalic(this.text.changeContactSubService[this.leng])}</Table.Th>
            <Table.Td>{this.textSizeTable(this.service.subContact)}</Table.Td>
          </Table.Tr>
        )
      }
      if(this.service.subWorkTime){
        res.push(
          <Table.Tr key={this.text.changeTimeSubService[this.leng]}>
            <Table.Th w={250}>{this.textSizeTableItalic(this.text.changeTimeSubService[this.leng])}</Table.Th>
            <Table.Td>{this.textSizeTable(this.service.subWorkTime)}</Table.Td>
          </Table.Tr>
        )
      }
      res.push(
        <Table.Tr key={this.text.manager[this.leng]}>
          <Table.Th w={250}>{this.textSizeTableItalic(this.text.manager[this.leng])}</Table.Th>
          <Table.Td>{this.textSizeTable(this.user.name ? this.user.name : this.user.email)}</Table.Td>
        </Table.Tr>
      )
      if(this.service.dataService){
        res.push(
          <Table.Tr key={this.text.changeInfoMainService[this.leng]}>
            <Table.Th w={250}>{this.textSizeTableItalic(this.text.changeInfoMainService[this.leng])}</Table.Th>
            <Table.Td>{this.textSizeTable(this.service.dataService)}</Table.Td>
          </Table.Tr>
        )
      }
      return res
    }

    render() {
      return (
        <div ref={this.props.innerRef} style={{marginRight: '2.5vmax', marginLeft: '2.5vmax', marginTop: '1vmax'}}>

          <Group justify="center" gap="xl" style={{marginRight: '1vmax', marginLeft: '1vmax'}}>
            <Text fw={700} size="sm" className="perenos">{this.dataText.docTitle}</Text> #
            <Text fw={700} size="sm">{this.data._orderServiceId_}</Text>
          </Group>

          <Group justify="space-between" gap="xl" style={{marginRight: '1vmax', marginLeft: '1vmax'}}>
            <Text size="sm">{this.service.name} {this.service.subName}</Text>
            {/* <Group justify="center" gap="xl" style={{marginRight: '1vmax', marginLeft: '1vmax'}}>
              <Text fw={700} size="sm" className="perenos">{this.dataText.docTitle}</Text> #
              <Text fw={700} size="sm">{this.data._orderServiceId_}</Text>
            </Group> */}
            <Text size="sm">{new Date(this.data.createdAt).toLocaleDateString([`${this.leng}`, "en"])} {new Date(this.data.createdAt).toLocaleTimeString([`${this.leng}`, "en"]).slice(0, -3)}</Text>
          </Group>

          <hr></hr>

          <Grid>
            <Grid.Col span={11.5}>
              <Table horizontalSpacing="sm" border="1" withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
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