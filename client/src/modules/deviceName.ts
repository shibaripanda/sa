export const deviceName = (name, currentName) => {
    if(name === '_DeviceBlocked_'){
      return currentName
    }
    return name
  }