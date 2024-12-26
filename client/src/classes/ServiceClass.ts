interface Service {
    name: string
    subServiсes: {name: string}[]
}

export class ServiceClass {
    data: any
    
    name: string
    subName: string

    constructor(data: Service){
        this.data = data

        this.name = data.name
        this.subName = data.subServiсes[0].name
    }

   

}