function putWaterToBoil(){
    console.log('Boil the Water');
    return new Promise((resolve) => {
        console.log('We have boiled water');
        resolve();
    }, 5000);
}
