export const upFirstString = (str: string) => {
    if(str.length){
       return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase() 
    }
    return str
}