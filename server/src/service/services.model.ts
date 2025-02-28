import * as mongoose from 'mongoose'

interface ServiceRoles {
  role: string
  access: string[]
}

interface SubService {
  name: string,
  options: {address: string, workTime: string, contact: string}
  subServiceId: string
}

interface Price {
  title: string,
  cost: number
}

interface ServiceDocuments {
  name: string,
  info: {name: string, text: string}[]
  image: {name: string, image: string}[]
}

interface ColorStatus {
  status: string,
  color: string
}

interface OrderData {
  item: string
  control: boolean
  variants: string[]
  onlyVariants: boolean
  multiVariants: boolean
  hidden: boolean
  saveNewVariants: boolean
  variant: boolean
  number: boolean
  hold: boolean
  blocked: boolean
}

interface LocalUsers {
  name: string | undefined, 
  email: string, 
  id: string
}

export const ServiceSchema = new mongoose.Schema({
    name: {
      type: String, 
      default: 'New Service',
      require: true
    },
    owner: {
      type: String,
      require: true
    },
    devices: {
      type: Array,
      default: ['Devicename_1', 'Devicename_2'],
      require: true
    },
    statuses: {
      type: Array,
      default: ['New', 'Ready'],
      require: true
    },
    colorStatuses: {
      type: [],
      default: [],
      require: true
    },
    orderData: {
      type: Array,
      default: [
        {item: '_DeviceBlocked_', 
          control: true, 
          number: false, 
          variant: true, 
          variants: [], 
          saveNewVariants: true, 
          onlyVariants: true, 
          multiVariants: false, 
          hidden: false, 
          hold: true,
          blocked: true}
      ],
      require: true
    },
    roles: {
      type: Array,
      default: [{role: 'Serviceman', access: []}, {role: 'Manager', access: []}, {role: 'Supermanager', access: []}],
      require: true
    },
    subServices: {
      type: Array,
      default: [{name: 'Local Service', subServiceId: 'subServiceId' + Date.now(), options: {address: '', workTime: '', contact: ''}}],
      require: true
    },
    serviceInfo: {
      type: String,
      default: '',
      require: true
    },
    serviceDocuments: {
      type: Array,
      default: [
        {name: 'NewOrderPrint', 
         data: {
          docTitle: 'Заказ наряд на выполнение работ',
          docTitleListRules: 'Правила и условия ремонта и (или) диагностики.',
          rules: `1. Предварительный срок диагностики и ремонта до 15 рабочих дней (без учета суббот, воскресений и праздников), за исключением п.2 и п.3. В момент сдачи оборудования в ремонт приемщик оговаривает ОРИЕНТИРОВОЧНЫЕ СРОКИ, которые могут измениться ввиду отсутствия или пересортицы з/ч, загруженности мастера и иных обстоятельств, но без согласования с заказчиком не может превышать срока установленного в данном пункте.
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
16. Согласование с заказчиком может осуществляться любым доступным способом (звонок, переписка в мессенджерах, устное согласование, письменное согласование).`,
          extraRules: 'Заказчик принимает все правила и условия ремонта'
          }
        },
        {name: 'PayCloseOrderPrint', 
          data: {
           title1: '',
           title2: '',
           title3: '',
           title4: '',
           title5: ''
          }
        }
      ],
      require: true
    },
    price: {
      type: Array,
      default: [{title: '', cost: 0}],
      require: true
    },
    dataService: {
      type: String, 
      default: '',
      require: true
    },
    localUsers: {
      type: Array,
      default: [],
      require: true
    },
    fee: {
      type: Number,
      default: 0,
      require: true
    }
  }, {timestamps: true})

  

  
  export interface Service {
    // _id: string
    name: string
    owner: string
    devices: string[]
    statuses: string[]
    roles: ServiceRoles[]
    subServices: SubService[]
    serviceInfo: string
    serviceDocuments: ServiceDocuments[]
    price: Price[],
    orderData: OrderData[]
    colorStatuses: ColorStatus[]
    localUsers: LocalUsers[]
    fee: number
  }
  
  
 