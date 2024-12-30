export const line = () => {
    return `[
    {
        name: 'orders',
        screen: OrderScreen,
        items: []
    },
    {
        name: 'createOrder',
        screen: NewOrderScreen,
        items: []
    },
    {
        name: 'serviceSettings',
        screen: SeviceSettingsScreen,
        items: [
            {message: 'changeNameMainService', screenItem: ChangeNameMainService}, 
            {message: 'changeNameSubService', screenItem: ChangeNameSubService},
            {message: 'changeServiceDeviceList', screenItem: ChangeServiceDeviceList, size: 12},
            {message: 'changeServiceStatusList', screenItem: ChangeServiceStatusList, size: 12}
        ]
    }
]`
}