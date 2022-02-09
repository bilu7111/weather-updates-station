function compareWeather(weatherFromDb, weatherFromAPI) {
    if(!weatherFromDb) return false;
    
    if(weatherFromDb.main !== weatherFromAPI.main){
        return false;
    }
    if(weatherFromDb.description !== weatherFromAPI.description){
        return false;
    }
    if(weatherFromDb.icon !== weatherFromAPI.icon){
        return false;
    }
    return true;
}

module.exports = compareWeather;