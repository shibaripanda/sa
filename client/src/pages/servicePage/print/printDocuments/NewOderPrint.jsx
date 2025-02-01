import { Button, Center, Grid, Group, Paper, Table, Text } from "@mantine/core";
import { Component } from "react";

export class NewOderPrint extends Component {

    constructor(props){
        super(props)
        this.data = props.data
        this.user = props.user
        this.service = props.service
        this.text = props.text
        this.leng = props.leng
    }

    myData(){
        console.log(this.data)
        console.log(this.service)
        return 'ff'
    }

    dataForTable(){
      console.log(this.data)
      console.log(this.service)
      const res = [
      ]
      for(const i in this.data){
        if(i[0] !== '_' && !['createdAt', 'updatedAt'].includes(i) && this.data[i]){
          res.push(
            <Table.Tr>
              <Table.Th w={250}>{i}</Table.Th>
              <Table.Td>{this.data[i]}</Table.Td>
            </Table.Tr>
          )
        }
      }
      if(this.service.subAddress){
        res.push(
          <Table.Tr>
            <Table.Th w={250}>{this.text.changeAddressSubService[this.leng]}</Table.Th>
            <Table.Td>{this.service.subAddress}</Table.Td>
          </Table.Tr>
        )
      }
      if(this.service.subContact){
        res.push(
          <Table.Tr>
            <Table.Th w={250}>{this.text.changeContactSubService[this.leng]}</Table.Th>
            <Table.Td>{this.service.subContact}</Table.Td>
          </Table.Tr>
        )
      }
      if(this.service.subWorkTime){
        res.push(
          <Table.Tr>
            <Table.Th w={250}>{this.text.changeTimeSubService[this.leng]}</Table.Th>
            <Table.Td>{this.service.subWorkTime}</Table.Td>
          </Table.Tr>
        )
      }
      res.push(
        <Table.Tr>
          <Table.Th w={250}>{this.text.manager[this.leng]}</Table.Th>
          <Table.Td>{this.user.name ? this.user.name : this.user.email}</Table.Td>
        </Table.Tr>
      )
      if(this.service.dataService){
        res.push(
          <Table.Tr>
            <Table.Th w={250}>{this.text.changeInfoMainService[this.leng]}</Table.Th>
            <Table.Td>{this.service.dataService}</Table.Td>
          </Table.Tr>
        )
      }
      
      return res
    }

    render() {
      return (
        <div ref={this.props.innerRef} style={{margin: '1vmax'}}>
          <Group justify="space-between" gap="xl" style={{marginRight: '1vmax', marginLeft: '1vmax'}}>
            <Text size="sm">{this.service.name} {this.service.subName}</Text>
            <Text fw={700} size="sm">{this.data._orderServiceId_}</Text>
            
            <Text size="sm">{new Date(this.data.createdAt).toLocaleDateString([`${this.leng}`, "en"])} {new Date(this.data.createdAt).toLocaleTimeString([`${this.leng}`, "en"])}</Text>
          </Group>
          <hr></hr>
          {/* <Text size="xs">{this.service.subAddress}, {this.service.subContact}, {this.service.subWorkTime}</Text> */}

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
              {/* <Center>
                <Text fw={700} size="xl" className='vertical'><span>{this.data._orderServiceId_}</span></Text>
              </Center> */}
            </Grid.Col>
          </Grid>

          <Center><Text td="underline" fw={700} size="sm" className="perenos">Правила и условия ремонта и (или) диагностики.</Text></Center>
          <Text size="xs" className="perenos">
          {`1. Предварительный срок диагностики и ремонта до 15 рабочих дней (без учета суббот, воскресений и праздников), за исключением п.2 и п.3. В момент сдачи оборудования в ремонт приемщик оговаривает ОРИЕНТИРОВОЧНЫЕ СРОКИ, которые могут измениться ввиду отсутствия или пересортицы з/ч, загруженности мастера и иных обстоятельств, но без согласования с заказчиком не может превышать срока установленного в данном пункте.
          2. При отсутствии деталей, диагностика и (или) ремонт может продлеваться на срок до их получения по согласованию с заказчиком.
          3. При периодически появляющейся неисправности ремонт может продлеваться на неопределенный срок, до полного устранения дефектов по согласованию с заказчиком.
          4. В случае отказа заказчика от дальнейшей диагностики и (или) ремонта по п.2 и п.3 оборудование выдается в течении 5 рабочих дней с момента требования, после оплаты заказчиком расходов понесенных мастерской, если такие имели место и если была согласована платная услуга или были заказаны детали.
          5. После диагностики и (или) ремонта могут оставаться незначительные следы вскрытия и внешнего воздействия.
          6. Ремонт производится только в отношении неисправностей, которые указаны заказчиком при приёмке, за исключением п.7.
          7. Если в результате ремонта возникли неисправности, заведомо не оговоренные, но препятствующие исправлению первоначальных неисправностей и (или) препятствующие полноценной работе оборудования, то данные работы проводятся после согласования с заказчиком. Заказчик и исполнитель обязуются считать такие согласования имеющими силу.
          8. При диагностике и (или) ремонте оборудования в некоторых случаях невозможно вернуть состояние оборудования на момент сдачи в ремонт.
          9. Оборудование, с согласия заказчика принимается без разборки и проверки скрытых неисправностей и повреждений. Заказчик согласен, что все обнаруженные в процессе диагностики и ремонта неисправности возникли до сдачи оборудования в ремонт.
          10. Сервисный центр не несет ответственности за любую информацию (а так же карты памяти и sim карты, оставленные в оборудовании), хранящуюся на оборудовании.
          11. При обнаружении в оборудовании следов воздействия влаги, а также при сильных механических повреждениях, гарантия на произведенный ремонт НЕ РАСПРОСТРАНЯЕТСЯ (п.11.4, СТБ 1303-2007).
          12. Заказчик принимает на себя риск возможной полной или частичной утраты работоспособности оборудования в процессе диагностики и (или) ремонта в случае грубых нарушений пользователем условий эксплуатации, наличия следов коррозии, попадания жидкости либо механических воздействий.
          13. Первичная диагностика производится БЕСПЛАТНО. Стоимость акта диагностики, если таковой необходим заказчику стоит 75 б.р..
          14. Ремонт без согласования стоимости с заказчиком допускается, если его стоимость не превышает предварительно согласованную стоимость, указанную в заказе.
          15. Исполнитель в праве передавать оборудование на ремонт и (или) диагностику третьим организациям или индивидуальным предпринимателям под свою ответственность без согласования с заказчиком.
          16. Согласование с заказчиком может осуществляться любым доступным способом (звонок, переписка в мессенджерах, устное согласование, письменное согласование).`}
          </Text>
        </div>
      )
    }
  }