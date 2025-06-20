export const defDoc = [
  {
    "name": "NewOrderPrint",
    "data": {
      "docTitle": "Work Order for Repair Services",
      "docTitleListRules": "Terms and Conditions of Repair and/or Diagnostics.",
      "rules": `1. The preliminary period for diagnostics and repair is up to 15 working days (excluding Saturdays, Sundays, and holidays), except for clauses 2 and 3. At the time of submitting the equipment for repair, the technician will indicate an ESTIMATED TIMEFRAME, which may change due to parts unavailability or mismatch, technician workload, or other factors, but cannot exceed the period specified in this clause without the customer's consent.
2. If parts are unavailable, diagnostics and/or repairs may be extended until they are received, subject to customer approval.
3. If the malfunction is intermittent, the repair period may be extended indefinitely until full resolution of the defect, by agreement with the customer.
4. If the customer refuses further diagnostics and/or repairs under clauses 2 and 3, the equipment will be returned within 5 working days upon request, after reimbursement of expenses incurred by the workshop, if applicable, and if a paid service or parts order was agreed.
5. Minor traces of disassembly and external intervention may remain after diagnostics and/or repair.
6. Repairs are performed only for the malfunctions indicated by the customer during equipment submission, except as per clause 7.
7. If new malfunctions arise during the repair that were not originally indicated but interfere with fixing the initial issues and/or the proper operation of the equipment, these works are performed only after customer approval. Such agreements are deemed valid by both parties.
8. It may be impossible to return the equipment to its original state prior to repair or diagnostics.
9. With customer consent, the equipment is accepted without disassembly and checking for hidden defects or damages. The customer agrees that all malfunctions found during diagnostics and repairs existed before submission.
10. The service center is not responsible for any information stored on the equipment (including memory cards and SIM cards).
11. If signs of moisture or severe mechanical damage are found, the repair WARRANTY DOES NOT APPLY.
12. The customer accepts the risk of full or partial loss of equipment functionality during diagnostics and/or repair due to improper usage, corrosion, liquid ingress, or physical impact.
13. Initial diagnostics is FREE. A diagnostic report, if required by the customer, costs $15.
14. Repairs may be performed without further approval if the cost does not exceed the previously agreed amount specified in the order.
15. The contractor has the right to subcontract diagnostics and/or repair to third parties under their responsibility, without additional customer approval.
16. Customer consent may be obtained by any available means (phone call, messenger, verbal or written agreement).`,
      "extraRules": "The customer accepts all repair terms and conditions."
    }
  },
  {
    "name": "WarrantyOrderPrint",
    "data": {
      "docTitle": "Warranty Certificate for Provided Services",
      "docTitleListRules": "Terms and Conditions of Warranty Service.",
      "rules": `- The contractor undertakes to correct faults related to the above-mentioned services free of charge during the warranty period.
- Warranty repairs are performed under a new service order within the standard timeframe.
- If diagnostics reveal that the issue is not covered under warranty, such work may be performed for a fee with customer approval.
- The warranty period is extended by the time the equipment remains in the workshop.

Warranty obligations do not cover the following cases:
- Mechanical damage, ingress of liquid or foreign objects (insects, etc.)
- Violation of storage, transportation, or operation rules due to customer actions, third parties, or force majeure (fire, flood, etc.)
- Absence or damage of the warranty certificate (it cannot be restored; copies are not accepted).
- Tampered serial numbers, damaged labels, seals, or stickers; signs of reattachment or restoration.
- Damage caused by natural disasters, fire, or poor household conditions (e.g., high humidity).
- Evidence of mechanical, chemical, or electrical damage to the product or its components, including signs of overheating, freezing, dust, or insect exposure.
- Compromised or incomplete equipment set.
- Evidence of operating the device under loads exceeding the norm.
- Unauthorized technical intervention or self-repair. Repairs conducted by unauthorized persons or organizations.
- The warranty does not cover parts provided by the customer.`,
      "extraRules": "The customer has read and accepts all warranty terms, has no complaints about quality or timelines."
    }
  }
]




//   [  {name: 'NewOrderPrint', 
//      data: {
//       docTitle: 'Заказ наряд на выполнение работ',
//       docTitleListRules: 'Правила и условия ремонта и (или) диагностики.',
//       rules: `1. Предварительный срок диагностики и ремонта до 15 рабочих дней (без учета суббот, воскресений и праздников), за исключением п.2 и п.3. В момент сдачи оборудования в ремонт приемщик оговаривает ОРИЕНТИРОВОЧНЫЕ СРОКИ, которые могут измениться ввиду отсутствия или пересортицы з/ч, загруженности мастера и иных обстоятельств, но без согласования с заказчиком не может превышать срока установленного в данном пункте.
// 2. При отсутствии деталей, диагностика и (или) ремонт может продлеваться на срок до их получения по согласованию с заказчиком.
// 3. При периодически появляющейся неисправности ремонт может продлеваться на неопределенный срок, до полного устранения дефектов по согласованию с заказчиком.
// 4. В случае отказа заказчика от дальнейшей диагностики и (или) ремонта по п.2 и п.3 оборудование выдается в течении 5 рабочих дней с момента требования, после оплаты заказчиком расходов понесенных мастерской, если такие имели место и если была согласована платная услуга или были заказаны детали.
// 5. После диагностики и (или) ремонта могут оставаться незначительные следы вскрытия и внешнего воздействия.
// 6. Ремонт производится только в отношении неисправностей, которые указаны заказчиком при приёмке, за исключением п.7.
// 7. Если в результате ремонта возникли неисправности, заведомо не оговоренные, но препятствующие исправлению первоначальных неисправностей и (или) препятствующие полноценной работе оборудования, то данные работы проводятся после согласования с заказчиком. Заказчик и исполнитель обязуются считать такие согласования имеющими силу.
// 8. При диагностике и (или) ремонте оборудования в некоторых случаях невозможно вернуть состояние оборудования на момент сдачи в ремонт.
// 9. Оборудование, с согласия заказчика принимается без разборки и проверки скрытых неисправностей и повреждений. Заказчик согласен, что все обнаруженные в процессе диагностики и ремонта неисправности возникли до сдачи оборудования в ремонт.
// 10. Сервисный центр не несет ответственности за любую информацию (а так же карты памяти и sim карты, оставленные в оборудовании), хранящуюся на оборудовании.
// 11. При обнаружении в оборудовании следов воздействия влаги, а также при сильных механических повреждениях, гарантия на произведенный ремонт НЕ РАСПРОСТРАНЯЕТСЯ (п.11.4, СТБ 1303-2007).
// 12. Заказчик принимает на себя риск возможной полной или частичной утраты работоспособности оборудования в процессе диагностики и (или) ремонта в случае грубых нарушений пользователем условий эксплуатации, наличия следов коррозии, попадания жидкости либо механических воздействий.
// 13. Первичная диагностика производится БЕСПЛАТНО. Стоимость акта диагностики, если таковой необходим заказчику стоит 75 б.р..
// 14. Ремонт без согласования стоимости с заказчиком допускается, если его стоимость не превышает предварительно согласованную стоимость, указанную в заказе.
// 15. Исполнитель в праве передавать оборудование на ремонт и (или) диагностику третьим организациям или индивидуальным предпринимателям под свою ответственность без согласования с заказчиком.
// 16. Согласование с заказчиком может осуществляться любым доступным способом (звонок, переписка в мессенджерах, устное согласование, письменное согласование).`,
//       extraRules: 'Заказчик принимает все правила и условия ремонта'
//       }
//     },
//     {name: 'WarrantyOrderPrint', 
//       data: {
//        docTitle: 'Гарантийный талон на оказанные услуги',
//        docTitleListRules: 'Правила и условия гарантийного обслуживания.',
//        rules: `- Исполнитель берет на себя обязанность на безвозмездное устранение неисправностей связанных с выполнением выше указанных работ в течении гарантийного срока.
//     - Гарантийный ремонт выполняется по новому заказу на оказание услуг в стандартные сроки.
//     - Если в результате диагностики выясняется, что случай не является гарантийным, то такие работы могут быть произведены на платной основе по согласованию с заказчиком.
//     - Гарантийный срок продлевается на время нахождения оборудования в мастерской
    
//     Гарантийные обязательства по бесплатному ремонту не распространяется на следующие случаи:
//     - Механические повреждения, попадания внутрь жидкости и других посторонних предметов (насекомые и т.п.)
//     - Нарушены правила эксплуатации, хранения или транспортировки товара в случае действий покупателя, третьих лиц или обстоятельств непреодолимой силы (пожар, наводнение и т. п.)
//     - Отсутствует или испорчен гарантийный талон (гарантийный талон не восстанавливается, ксерокопии или другие копии действительными не считаются).
//     - Нарушение маркировки или невозможность считывания серийного номера с изделия, нарушены пломбы, наклейки, стикеры, обнаружены следы их переклеивания, восстановления и т. п.
//     - Повреждения, вызванные стихийными бедствиями, пожаром, неблагоприятными бытовыми факторами (например, повышенной влажностью помещения, где использовалось изделие)
//     - Есть следы механических, химических, электротехнических повреждений, как самого товара, так и его компонентов, а также в случае присутствия следов перегрева или переохлаждения либо воздействия пыли или насекомых.
//     - Нарушена или испорчена комплектность оборудования.
//     - Есть следы использования изделия в режимах с нагрузкой, превышающей нормативную. 
//     - Присутствует вмешательство в техническую начинку товара, следы самостоятельного ремонта. Ремонт в не уполномоченном сервисном центре, либо произведенный лицами, не имеющими полномочий производить ремонт.
//     - Гарантия не распространяется на з/ч предоставленные заказчиком.`,
//        extraRules: 'Заказчик ознакомился и принимает все условия гарантийного обслуживания, претензий к качеству и срокам не имеет.'
//        }
//      }
//   ]