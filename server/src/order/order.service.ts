import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Order, OrderSchema } from './order.model'
import { rendomLetteOrder } from './tech/rendomLetteOrder'
import { rendomNumberOrder } from './tech/rendomNumberOrder'
import { BotService } from 'src/bot/bot.service'

const ordersUp = [{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Сухаревская 68 79","Модель":"Vivo V23E","Серийный_номер":"бн","Неисправность":"проблема по зарядке","Заказчик":"Дубновицкий Сергей","Телефон_заказчика":"29 7665681","_orderServiceId_":"9589_KXX","Комплект":"без","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Шаранговича 53-90","Модель":"Xiaomi 2109119dg","Серийный_номер":"бн","Неисправность":"перезагружается","Заказчик":"Жвирко ЕВ","Телефон_заказчика":"29 112 53 48","_orderServiceId_":"1115_YRO","Комплект":"Без комплекта","Дополнительная_информация":"на момент приёмки не вкл, не заряжается. возможно вздут акб, сколы зс"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Шамякина 11-92","Модель":"LG X210EM","Серийный_номер":"353457-09","Неисправность":"замена АКБ+разъём","Заказчик":"Божко ЮМ","Телефон_заказчика":"29 656 60 98","_orderServiceId_":"VV1870_EFW","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Школьная 16 115","Модель":"Honor M2101K7BNY","Серийный_номер":"бн","Неисправность":"не заряжается, нет лотка","Заказчик":"Бондарь ВВ","Телефон_заказчика":"29 6065368","_orderServiceId_":"9103_WPO","Комплект":"Без комплекта","Дополнительная_информация":"возможно сим лоток у нас, поискать, если нет соласовать новый, фото гарантии"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Сухаревская 38-1-103","Модель":"Xiaomi note7","Серийный_номер":"0","Неисправность":"не загружается","Заказчик":"Киселев Л.М.","Телефон_заказчика":"80445014501","_orderServiceId_":"6695_TKU","Комплект":"","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Янковского 42-80","Модель":"Honor RCY-LX1","Серийный_номер":"0","Неисправность":"не работает микрофон","Заказчик":"Санкевич Э.М.","Телефон_заказчика":"80295067677","_orderServiceId_":"1625_LUJ","Комплект":"","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Фёдорова 21-5","Модель":"Samsung a115","Серийный_номер":"354698-11-877891-2","Неисправность":"Быстро разряжается батарея","Заказчик":"Шалохина ЛМ","Телефон_заказчика":"29 140 41 53","_orderServiceId_":"1603_LGJ","Комплект":"Батарея","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Шаранговича 76 41","Модель":"Apple iPhone 6","Серийный_номер":"бн","Неисправность":"нет батареи","Заказчик":"Герасимчик Ольга","Телефон_заказчика":"29 1292764","_orderServiceId_":"1793_DJC","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Горецкого 29 43","Модель":"Samsung A505FN/DS","Серийный_номер":"R58M71BAJ5K","Неисправность":"очень тормозит","Заказчик":"Ракаева Викторния","Телефон_заказчика":"29 1624316","_orderServiceId_":"5344_NRW","Комплект":"Без комплекта","Дополнительная_информация":"греется"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Панченко 26-234","Модель":"iphone x","Серийный_номер":"0","Неисправность":"замена экрана","Заказчик":"Бразовский В.А.","Телефон_заказчика":"80445703510","_orderServiceId_":"1034_ERJ","Комплект":"","Дополнительная_информация":"трещины на крышке"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Панченко 26-234","Модель":"iphone x","Серийный_номер":"0","Неисправность":"замена экрана","Заказчик":"Бразовский В.А.","Телефон_заказчика":"80445703510","_orderServiceId_":"9848_CQQ","Комплект":"","Дополнительная_информация":"трещины на крышке"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"панченко 60-61","Модель":"redmi  10C","Серийный_номер":"бн","Неисправность":"разбито стекло экрана","Заказчик":"Кабак ПГ","Телефон_заказчика":" ","_orderServiceId_":"2748_LRZ","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Сухаревская 1-74","Модель":"Xiaomi 2109119dg","Серийный_номер":"бн","Неисправность":"не заряжается, не включается","Заказчик":"Левкович АВ","Телефон_заказчика":"29 699 12 61","_orderServiceId_":"9263_OSD","Комплект":"","Дополнительная_информация":"разбит экран"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Плеханова 56-2-44","Модель":"Tecno spark  10","Серийный_номер":"бн","Неисправность":"замена экрана, самостоятельно разбирали","Заказчик":"Шибут СВ","Телефон_заказчика":"44 5428428","_orderServiceId_":"6459_FRN","Комплект":"Без комплекта","Дополнительная_информация":"разобран"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"фёдорова 23-15","Модель":"Samsung g935f","Серийный_номер":"357973-08-554751-8","Неисправность":"Не включается, не заряжается, кз","Заказчик":"Константинов СН","Телефон_заказчика":"29 874 64 17","_orderServiceId_":"1513_CWA","Комплект":"Без комплекта","Дополнительная_информация":"нет задней крышки, разбито стекло камеры,разбит экран, вмятины"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"сухаревская 17-107","Модель":"Apple iphone 8","Серийный_номер":"бн","Неисправность":"замена экрана+микрофон","Заказчик":"Захарекич АА","Телефон_заказчика":"257774174","_orderServiceId_":"8385_TOH","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Чайлытко 9 68","Модель":"Xiaomi mi M1903F10G","Серийный_номер":"БН","Неисправность":"разбит экран","Заказчик":"Симаков Сергей","Телефон_заказчика":"44 7699690","_orderServiceId_":"5782_ADF","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Ноутбук","Адрес_заказчика":"Шаранговича 72 63","Модель":"Lenovo бм","Серийный_номер":"бн","Неисправность":"не вкл","Заказчик":"Нос Яна","Телефон_заказчика":"44 5649714","_orderServiceId_":"4024_BVP","Комплект":"Без комплекта","Дополнительная_информация":"нет экрана, разобран"},{"_DeviceBlocked_":"Планшет","Адрес_заказчика":"Шаранговича 62-60","Модель":"GINZZU GT-X870","Серийный_номер":"07031504220161","Неисправность":"не включается","Заказчик":"Савицкий СВ","Телефон_заказчика":"29 123 43 16","_orderServiceId_":"2150_OOX","Комплект":"Без комплекта","Дополнительная_информация":"не включали 2 г"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Шамякина 5-48","Модель":"iphone 14","Серийный_номер":"0","Неисправность":"не заряжается","Заказчик":"Баженова Р.Г.","Телефон_заказчика":"80256722665","_orderServiceId_":"6936_RGC","Комплект":"","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Фёдорова 21-99","Модель":"Samsung a105","Серийный_номер":"бн","Неисправность":"не включается, разбит экран","Заказчик":"Дрик ВП","Телефон_заказчика":"25 939 09 17","_orderServiceId_":"2461_SZQ","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Лобанка 89-294","Модель":"poco poco k30 pro","Серийный_номер":"бн","Неисправность":"висит на Poco","Заказчик":"Лобатый ОА","Телефон_заказчика":"29 188 62 34","_orderServiceId_":"7331_NSY","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"296111933","Модель":"Apple iPhone X","Серийный_номер":"бн","Неисправность":"рябь на экране","Заказчик":"Бакулина ОЮ","Телефон_заказчика":"Горецкого 32-69","_orderServiceId_":"1999_KUB","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Сухаревская 34-285","Модель":"Apple iPhone 7 Plus","Серийный_номер":"бн","Неисправность":"Быстро разряжается батарея, плохо заряжается","Заказчик":"Громович ИГ","Телефон_заказчика":"29 156 96 64","_orderServiceId_":"1827_HCA","Комплект":"Без комплекта","Дополнительная_информация":"была жидкость"},{"_DeviceBlocked_":"Электронная книга","Адрес_заказчика":"Фёдорова 9-132","Модель":"ONYX  ","Серийный_номер":"038017919H3357","Неисправность":"Не включается","Заказчик":"Титов ВВ","Телефон_заказчика":"29 777 64 56","_orderServiceId_":"1802_BDX","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Электронная книга","Адрес_заказчика":"Фёдорова 9-132","Модель":"onyx бм","Серийный_номер":"038017919h3357","Неисправность":"не включается, давно разряжен ","Заказчик":"Титов ВВ","Телефон_заказчика":"29 777 64 56","_orderServiceId_":"7152_NCY","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Лобанка 71-13","Модель":"Redmi m1908c3jg","Серийный_номер":"бн","Неисправность":"не знают гугл аккаунт","Заказчик":"Плисюк ВС","Телефон_заказчика":"29 650 79 26","_orderServiceId_":"8209_YAO","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Ноутбук","Адрес_заказчика":"Лобанка 106-62","Модель":"HP TPN-C125","Серийный_номер":"CND70745JS","Неисправность":"не загружается","Заказчик":"Хвостюк АА","Телефон_заказчика":"29 185 91 83","_orderServiceId_":"7282_PCC","Комплект":"Зарядное устройство","Дополнительная_информация":""},{"_DeviceBlocked_":"Ноутбук","Адрес_заказчика":"Сухаревская 32-29","Модель":"Lenovo Z510","Серийный_номер":"YB00873306","Неисправность":"сбивается время, нет кнопки","Заказчик":"Бойнич ЭР","Телефон_заказчика":"29 186 72 16","_orderServiceId_":"9979_HGT","Комплект":"Зарядное устройство","Дополнительная_информация":"пароль edward"},{"_DeviceBlocked_":"МФУ","Адрес_заказчика":"Фёдорова 23-80","Модель":"Canon ts5040","Серийный_номер":"бн","Неисправность":"не печатает","Заказчик":"Караченко ЮК","Телефон_заказчика":"29 309 36 26","_orderServiceId_":"4717_HBV","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Ноутбук","Адрес_заказчика":"Горецкого 79-37","Модель":"Lenovo 3 17alc6","Серийный_номер":"pf9xb1416047","Неисправность":"отключается","Заказчик":"Жуков АС","Телефон_заказчика":"44 572 16 43","_orderServiceId_":"4967_PGR","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Ноутбук","Адрес_заказчика":"Горецкого 11 136","Модель":"Asus FA506","Серийный_номер":"L4NRCX018852168","Неисправность":"выпадает в синий экран","Заказчик":"Бурачевский Владимир","Телефон_заказчика":"29 2694316","_orderServiceId_":"3108_KKG","Комплект":"Зарядное устройство","Дополнительная_информация":""},{"_DeviceBlocked_":"Ноутбук","Адрес_заказчика":"Лобанка 75 8","Модель":"Asus D553M","Серийный_номер":"F7N0CV273419305","Неисправность":"не вкл","Заказчик":"Щебетова Елизавета","Телефон_заказчика":"25 9171248","_orderServiceId_":"5116_COG","Комплект":"Зарядное устройство, Батарея","Дополнительная_информация":"отломан кусок корпуса"},{"_DeviceBlocked_":"Колонка","Адрес_заказчика":"Лобанка 110-69","Модель":"sven ps 580","Серийный_номер":"бн","Неисправность":"не вкл, не заряжается, вырван разъём","Заказчик":"Псарёва ИК","Телефон_заказчика":"29 140 13 14","_orderServiceId_":"1998_TJQ","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"фёдорова 13-2-53","Модель":"Honor 20","Серийный_номер":"518129","Неисправность":"замена экрана","Заказчик":"Цвилик ЮВ","Телефон_заказчика":" 29 751 05 17","_orderServiceId_":"4248_IXA","Комплект":"Без комплекта","Дополнительная_информация":"разбито стекло камеры, сломан сим лоток"},{"_DeviceBlocked_":"Планшет","Адрес_заказчика":"Лобанка 81-103","Модель":"Huawei dby-w09","Серийный_номер":"бн","Неисправность":"разбито стекло","Заказчик":"Пустошило АЯ","Телефон_заказчика":"29 692 70 11","_orderServiceId_":"3689_TXK","Комплект":"Без комплекта","Дополнительная_информация":"не работает распознование лица, дефекты на углах, трещины на корпусе,"},{"_DeviceBlocked_":"Ноутбук","Адрес_заказчика":"Лобанка 99-60","Модель":"Dell P75G","Серийный_номер":"15824548946","Неисправность":"включается с 20-25 раза, не работает перезагрузка","Заказчик":"Езепов ВН","Телефон_заказчика":"29 570 77 24","_orderServiceId_":"4608_KGB","Комплект":"Без комплекта","Дополнительная_информация":"не все болты, царпины, потёртости, сломаны петли"},{"_DeviceBlocked_":"Системный блок","Адрес_заказчика":"Сухаревская 38-126","Модель":"бб бм","Серийный_номер":"бн","Неисправность":"не работает","Заказчик":"Дранговский ВВ","Телефон_заказчика":"297530523","_orderServiceId_":"1805_QYP","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Сухаревская 46 146","Модель":"Blackview бм","Серийный_номер":"бн","Неисправность":"нет изображения","Заказчик":"Губен Нина","Телефон_заказчика":"44 5386962","_orderServiceId_":"9662_BYW","Комплект":"Без комплекта","Дополнительная_информация":" менялось с зч клиента, были вопросы по шлейфу"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Сухаревская 5-14","Модель":"Redmi 23117RA68G","Серийный_номер":"862574064310627","Неисправность":"восстановление после жидкости (важно чтобы работал отпечаток)","Заказчик":"Подмаркова АВ","Телефон_заказчика":"29 895 92 05","_orderServiceId_":"1892_QGR","Комплект":"Без комплекта","Дополнительная_информация":"не включала"},{"_DeviceBlocked_":"Системный блок","Адрес_заказчика":"Шаранговича 74-97","Модель":"Пилот бм","Серийный_номер":"бн","Неисправность":"Не включается","Заказчик":"Чернобыльский АА","Телефон_заказчика":"29 356 33 18","_orderServiceId_":"2616_UHP","Комплект":"Без комплекта","Дополнительная_информация":"без стенки"},{"_DeviceBlocked_":"Системный блок","Адрес_заказчика":"Янковского 13-93","Модель":"LG бм","Серийный_номер":"бн","Неисправность":"Чёрный экран, шумит","Заказчик":"Донская ИЛ","Телефон_заказчика":"29 25 99 225","_orderServiceId_":"8186_QTZ","Комплект":"Без комплекта","Дополнительная_информация":" "},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Сухаревская 38 1 92","Модель":"Blackview A80 Plus","Серийный_номер":"A80PlusNEU00003963","Неисправность":"Разбит модуль","Заказчик":"Каштанов Анатолий","Телефон_заказчика":"29 6526662","_orderServiceId_":"7806_QFX","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Панченко 14 136","Модель":"Poco c40","Серийный_номер":"бн","Неисправность":"мерцает и не срабатывает экран","Заказчик":"Лежневич Дмитрий","Телефон_заказчика":"29 5053633","_orderServiceId_":"9745_JDB","Комплект":"Без комплекта","Дополнительная_информация":"снизу просвет, нет решетки динамика"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Сухаревская 27 111","Модель":"Redmi 2201117SG","Серийный_номер":"бн","Неисправность":"разбит экран","Заказчик":"Чечко Сергей","Телефон_заказчика":"29 7538377","_orderServiceId_":"6218_NQN","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Сухаревская 17 7","Модель":"Huawei DUB-LX1","Серийный_номер":"бн","Неисправность":"разбит экран","Заказчик":"Серебрякова Мария","Телефон_заказчика":"44 5548632","_orderServiceId_":"4090_XFU","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Шарагновича 52 238","Модель":"Huawei JNY-LX1","Серийный_номер":"бн","Неисправность":"разбит экран","Заказчик":"Лобач Алексей","Телефон_заказчика":"29 8781190","_orderServiceId_":"4825_SEJ","Комплект":"Без комплекта","Дополнительная_информация":""},{"_DeviceBlocked_":"Телевизор","Адрес_заказчика":"Фёдорова 3-57","Модель":"Samsung UE40D5500RW","Серийный_номер":"Z8CE3SOC100084P","Неисправность":"самостоятельно включается и выключается","Заказчик":"Сычёв ПМ","Телефон_заказчика":"29 61 64 691","_orderServiceId_":"2318_KDQ","Комплект":"","Дополнительная_информация":"Шнур+пульт"},{"_DeviceBlocked_":"Телефон","Адрес_заказчика":"Чайлытко 19-120","Модель":"Redmi M2101K6G","Серийный_номер":"бн","Неисправность":"не включается, не работала кнопка вкл+замена крышки","Заказчик":"Чехольский АА","Телефон_заказчика":"29 387 68 60","_orderServiceId_":"4529_LRQ","Комплект":"Без комплекта","Дополнительная_информация":""}]

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') 
        private orderMongo: Model<Order>,
        @Inject(forwardRef(() => BotService))
        private botService: BotService,
    ) {}

    async getOrderPhotos(orderId, serviceId, subServiceId, user){
        // console.log(serviceId)
        // console.log(user.services_roles.find(item => item.serviceId === serviceId))
        const userFilter = user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId)
        return await this.orderMongo.findOne({_id: orderId, _status_: {$nin : userFilter.statuses}}, {_media_: 1, _id: 0})
    }
    async updateOrderWork(serviceId, subServiceId, orderId, work, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_work_',
                        old: '',
                        new: 'Delete all works',
                        date: Date.now()
                        }
                    },
                    _work_: work
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async deleteAllWork(serviceId, subServiceId, orderId, work, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_work_',
                        old: '',
                        new: 'Delete all works',
                        date: Date.now()
                        }
                    },
                    _work_: []
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async deleteWork(serviceId, subServiceId, orderId, work, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_work_',
                        old: '',
                        new: work.work + ' ' + work.total + ' ' + service.localUsers.find(item => item.id === work.master).email,
                        date: Date.now()
                        }
                    },
                    $pull: {_work_: {_id: work._id}}
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async addNewWork(serviceId, subServiceId, orderId, work, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_work_',
                        old: '',
                        new: work.work + ' ' + work.total + ' ' + service.localUsers.find(item => item.id === work.master).email,
                        date: Date.now()
                        },
                    _work_: work
                    }
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async addInformationOrder(serviceId, subServiceId, orderId, data, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {$push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_information_',
                        old: '',
                        new: data,
                        date: Date.now()
                        },
                    _information_: data
                    }
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async editOrderStatus(serviceId, subServiceId, orderId, newStatus, user, service){
        const old = await this.orderMongo.findOne({_id: orderId, _serviceId_: serviceId}, {_status_: 1, _id: 0})
        if(old){
            const updated = await this.orderMongo.findOneAndUpdate(
                {_id: orderId, _serviceId_: serviceId}, 
                {_status_: newStatus, $push: {
                    _history_: {
                        user: user.name ? user.name + ' (' + user.email + ')' : user.email,
                        userId: user._id,
                        edit: '_status_',
                        old: old._status_ ? old._status_ : '',
                        new: newStatus,
                        date: Date.now()
                        }
                    }
                }, 
                {returnDocument: 'after'})
            const name = service.subServices.find(item => item.subServiceId === updated._subServiceId_)
            updated._subService_ = name ? name.name : '--'
            return updated
        }
        return false   
    }
    async createOrder(serviceId, subServiceId, newOrder, user, service){
        const orderSh = async () => {
            const res = {}
            for(const i of newOrder){
                res[i.field] = i.number ? 'number' : 'string'
            }
            return res
        }
        const orderData = async () => {
            const res = {
                _status_: service.statuses[0] ? service.statuses[0] : 'New',
                _serviceId_: serviceId, 
                _subServiceId_: subServiceId,
                _orderServiceId_: rendomNumberOrder({min: 1000, max: 9999}) + '_' + rendomLetteOrder() + rendomLetteOrder() + rendomLetteOrder(),
                _manager_: user.name ? user.name + ` (${user.email})` : user.email,
                _media_: user.newOrderImages
            }
            for(const i of newOrder){
                res[i.field] = i.data
            }
            return res
        }
        OrderSchema.add(await orderSh())
        const ord = await this.orderMongo.create(await orderData())
        console.log(ord._id)
        if(ord){
            const name = await service.subServices.find(item => item.subServiceId === ord._subServiceId_)
            ord._subService_ = name ? name.name : '--'
            if(user.telegramId){
              await user.updateOne({newOrderImages: []})
            //   await this.botService.newOrderTelegramMessage(user.telegramId, ord)  
            }
            return ord 
        }
    }
    async getOrdersFilter(serviceId, subServiceId, orderId, exist, user, service){
        console.log(service.orderData.map(item => item.item))
        const line = service.orderData.filter(item => !item.number).map(item => ({[item.item]: {$regex: orderId, $options: "i"}}))
        
        line.push({'_orderServiceId_': {$regex: orderId, $options: "i"}})
        line.push({'_status_': {$regex: orderId, $options: "i"}})
        line.push({'_manager_': {$regex: orderId, $options: "i"}})
        console.log(line)
        const userFilter = user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId)
        // const res = await this.orderMongo.find({_orderServiceId_: {$regex: orderId}, _subServiceId_: subServiceId, _status_: {$nin : userFilter.statuses}}).limit(100).sort({createdAt: -1})
        const res = await this.orderMongo.find({$or: line, _id: {$nin : exist}, _subServiceId_: subServiceId, _status_: {$nin : userFilter.statuses}}).limit(100).sort({createdAt: -1})
        console.log(res.length)
        for(const i of res){
            const name = service.subServices.find(item => item.subServiceId === i._subServiceId_)
            i._subService_ = name ? name.name : '--'
        }
        return res 
    }
    async getOrders(serviceId, subServiceId, start, end, user, service){

        // console.log(user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId))
        
        const userFilter = user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId)
        // console.log(service)
        const res = await this.orderMongo.find({_subServiceId_: subServiceId, _status_: {$nin : userFilter.statuses}}).skip(start).limit(end).sort({createdAt: -1})
        for(const i of res){
            const name = service.subServices.find(item => item.subServiceId === i._subServiceId_)
            i._subService_ = name ? name.name : '--'
        }
        return res
    }
    async getOrder(orderId, serviceId, subServiceId, user, service){

        const userFilter = user.services_roles.find(item => item.serviceId === serviceId).subServices.find(item => item.subServiceId === subServiceId)
        const res = await this.orderMongo.findOne({_id: orderId, _status_: {$nin : userFilter.statuses}})
        if(res){
            const name = service.subServices.find(item => item.subServiceId === res._subServiceId_)
            res._subService_ = name ? name.name : '--'
            return res 
        }
    }

    // async createOrder(serviceId, subServiceId, newOrder1, user, service){

    //     await this.orderMongo.deleteMany()
    
    //     console.log(ordersUp)
    //     console.log(newOrder1)
    
    //     for(const newOrder of ordersUp){
    
    //         const orderSh = async () => {
    //             const res = {}
    //             for(const i of Object.entries(newOrder)){
    //                 res[i[0]] = 'string'
    //             }
    //             return res
    //         }
    //         const orderData = async () => {
    //             const res = {
    //                 _status_: service.statuses[0] ? service.statuses[0] : 'New',
    //                 _serviceId_: serviceId, 
    //                 _subServiceId_: subServiceId,
    //                 // _orderServiceId_: newOrder._orderServiceId_,
    //                 _manager_: user.name ? user.name + ` (${user.email})` : user.email,
    //             }
    //             // for(const i of newOrder){
    //             //     res[i.field] = i.data
    //             // }
    //             return {...res, ...newOrder}
    //         }
    //         OrderSchema.add(await orderSh())
    //         const ord = await this.orderMongo.create(await orderData())
    //     }
    
    //     return false
    // }

}
