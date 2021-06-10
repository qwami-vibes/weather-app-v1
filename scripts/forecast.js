class forecast {
    constructor() {
        this.key = '2wP7yAe2SzzbGGa2OGrCHAC96BT9QMET';
        this.cityURL = `http://dataservice.accuweather.com/locations/v1/cities/search`;
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURL + query);
        const data = await response.json();
        return data[0];
    }

    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURL + query);
        const data = await response.json();
        return data[0];
    }
    
    async updateCity(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return {cityDets, weather}
    }
}