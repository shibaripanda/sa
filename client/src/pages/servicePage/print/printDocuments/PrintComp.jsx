import React from "react"
import { Text } from "@mantine/core"


export const PrintComp = React.forwardRef((props, ref) => {

    // const camp = {}
    // camp.docprint =  props.props.settings.documents
    // const post = props.props.data
    
    // const textSet = (index) => {
    //     if(typeof camp.docprint[index] !== 'undefined'){
    //         return camp.docprint[index].text
    //     }
    //     return 'не настроено'
    // }

    return (
        <div ref={ref} className="App">
            bgbgbgbgbg
        {/* <table border="0" cellSpacing="0" cellPadding="0" width='775px' className="table">
            <tbody>
            <tr>
                <td align="left"><b><font size="2">{camp.docprint.namecomp.text ? camp.docprint.namecomp.text : 'не настроено'}</font></b></td>  
            </tr>
            <tr>
                <td align="center"><b><font size="3">{textSet('name')} № {post.order} от {new Date(post.date).toLocaleString().split(',')[0]}</font></b></td>
            </tr>
            </tbody>
        </table> */}
        
        {/* <table border="1" cellSpacing="0" cellPadding="0" width='775px' className="table">
            <tbody>
            <tr>
                <td colSpan="5" rowSpan="2" align="center"><b>&nbsp;Исполнитель принимает, а заказчик передает нижеуказанное оборудование</b></td>
                <td colSpan="3" rowSpan="2" align="center"><b><h2>&nbsp;{post.clientTel}</h2></b></td>
                <td colSpan="1" rowSpan="14" className='vertical'><span><h1>&nbsp;{post.order}</h1></span></td>
            </tr>
            <tr>
                
            </tr>
            <tr>
                <td colSpan="2"><b>&nbsp;Заказ №</b></td>
                <td align="center">&nbsp;{post.order}</td>
                <td colSpan='2' align="center">&nbsp;{new Date(post.date).toLocaleString()}</td>
                <td align="center">&nbsp;Сотрудник СЦ:</td>
                <td colSpan='2' align="center">&nbsp;{sessionData('read', 'name')}</td>
            </tr>
            <tr>
                <td colSpan="2"><b>&nbsp;Заказчик:</b></td>
                <td colSpan="6">&nbsp;{post.name}, {post.addres}, {post.clientTel}</td>
            </tr>    
            <tr>
                <td colSpan="2"><b>&nbsp;Оборудование:</b></td>
                <td colSpan="2">&nbsp;{post.title}</td>
                <td colSpan="2">&nbsp;{post.firm} {post.model}</td>
                <td colSpan="2">&nbsp;s/n: {post.sn}</td>
            </tr>
           
            <tr>
                <td colSpan="2"><b>&nbsp;Внешний вид:</b></td>
                <td colSpan="6">&nbsp;{post.view}</td>
            </tr>
            <tr>
                <td colSpan="2"><b>&nbsp;Комплектация:</b></td>
                <td colSpan="6">&nbsp;{post.complect}</td>
            </tr>
            <tr>
                <td colSpan="2"><b>&nbsp;Неисправность со слов заказчика:</b></td>
                <td colSpan="6">&nbsp;{post.problem}</td>
            </tr>
            <tr>
                <td colSpan="2"><b>&nbsp;Информация:</b></td>
                <td colSpan="6">&nbsp;{post.info}</td>
            </tr>
            <tr>
                <td colSpan="2"><b>&nbsp;Предварительная стоимость:</b></td>
                <td colSpan="6"><b>&nbsp;{post.cost} бел.руб.</b></td>
            </tr>
            <tr>
                <td colSpan="8"><b>&nbsp;{camp.docprint.soglas.text ? camp.docprint.soglas.text : 'не настроено'}</b></td>
            </tr>
            <tr>
                <td colSpan={2}><b>&nbsp;Исполнитель:</b></td>
                <td colSpan={6}>&nbsp;{camp.docprint.recviz.text}</td>
            </tr>
            <tr>
                <td colSpan={2}><b>&nbsp;Время работы и контакты:</b></td>
                <td colSpan={6}>&nbsp;{camp.docprint.time.text ? camp.docprint.time.text : 'не настроено'},&nbsp;{camp.docprint.telefonnumber.text ? camp.docprint.telefonnumber.text : 'не настроено'}</td>
            </tr>
            </tbody>
        </table> */}

        {/* <table border="0" cellSpacing="0" cellPadding="0" width='775px' className="table">
            <tbody>
            <tr>
                <td align="center" colSpan={5}><b><font size="3">Правила и условия ремонта и (или) диагностики.</font></b></td>
            </tr>
            <tr>
                <td className="border" colSpan={5}>
                <font size="3">
                <div className="perenos"><Text size="14px">{camp.docprint.maintext.text ? camp.docprint.maintext.text : 'не настроено'}</Text></div>
                </font>
                </td>
            </tr>
            <tr>
                <td colSpan={5}><font size="4"><b>&nbsp;{camp.docprint.oznak.text ? camp.docprint.oznak.text : 'не настроено'}</b></font></td>
            </tr>
            <tr>
                <td colSpan={5}>&nbsp;</td>
            </tr>
            <tr>
                <td align="left" colSpan={2} width={'50%'}><font size="3">Заказчик:</font></td>
                <td align="right">&nbsp;</td>
                <td align="left" colSpan={2} width={'50%'}><font size="3">Сотрудник СЦ:</font></td>
            </tr>
            <tr>
                <td align="center" colSpan={2}>&nbsp;</td>
                <td align="right">&nbsp;</td>
                <td align="center" colSpan={2}>&nbsp;</td>
            </tr>
            <tr>
                <td align="left" width={'10%'}><font size="3">Подпись:</font></td>
                <td align="right" width={'35%'}><font size="3">{post.name}</font></td>
                <td align="right" width={'10%'}>&nbsp;</td>
                <td align="left" width={'10%'}><font size="3">Подпись:</font></td>
                <td align="right" width={'35%'}><font size="3">{sessionData('read', 'name')}</font></td>
            </tr>
            <tr>
                <td align="left" colSpan={2}><div className="create-line"></div></td>
                <td align="right">&nbsp;</td>
                <td align="left" colSpan={2}><div className="create-line"></div></td>
            </tr>
            </tbody>
        </table> */}

        </div>
    )
})