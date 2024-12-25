import { NewOrderScreen } from "./newOrderScreen/NewOrderScreen.tsx";
import { OrderScreen } from "./ordersScreen/OrderScreen.tsx";

const line = [
    {
        name: 'hello',
        screen: OrderScreen
    },
    {
        name: 'welcome',
        screen: NewOrderScreen
    }
]

export class ScreenLine {
    line: {name: string, screen: any}[]
    data: {}

    constructor(data: {}){
        this.line = line
        this.data = data
    }

    getMenuItems(){
        return this.line.map(item => item.name)
    }

    getScreen(activeScreen: number){
        return this.line[activeScreen].screen(this.data)
    }

}