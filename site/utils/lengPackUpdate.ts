import { openAiRequest } from './openAI'
import * as fs from 'fs';
import { lengList } from '../leng.config';

interface Messages {
    [key: string]: string
  }

export const getLenguagesFromAI = async () => {
    const messages: Messages = await import(`../locales/ru.json`).then((m) => m.default)
    for(const i of lengList){
        console.log(i)
        const data: {[key: string]: string} = {}
        if(i !== 'ru'){
            for(const line in messages){
                data[line] = await openAiRequest(`Переведи на ${i} язык: "${messages[line]}", без кавычек и с большой буквы, в ответе только перевод`)
            }
            console.log(data)
            fs.writeFileSync('locales/' + i + '.json', JSON.stringify(data, null, 2), 'utf8')
        }
    }
}
