import { Component } from '@angular/core';

const API_URL = 'https://open-weather13.p.rapidapi.com/city/';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '95c6615364msh2ec3badbe9a49e0p1d7bccjsn5756adf5f4f1',
    'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
  },
};
interface SearchItem {
  term: string;
  icon: string;
  temp: number;
  description: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  inputValue!: string;
  WeatherData: any;
  output: any;
  City!: string;
  Tempeture!: number;
  MinTemp!: number;
  MaxTemp!: number;
  Precipitation!: number;
  Humidity!: number;
  Wind!: number;
  Visibility!: number;
  Country!: string;
  WeatherDesc!: string;
  Icon!: string;
  searchHistory: SearchItem[] = [];
  isFavorite: boolean = false;
  favoriteList: any[] = [];


  constructor() {}

  ngOnInit() {
    this.getCurrentTimeDay();
  }


  async getWeatherData(city: string) {
    console.log(city);
    if (city) {
      try {
        const response = await fetch(`${API_URL}${city}`, options);
        const result = await response.json();
        this.isFavorite = false;
        console.log(result);
        this.City = result.name;
        this.Country = result.sys?.country;
        this.Tempeture = result.main?.temp;
        this.WeatherDesc = result.weather[0]?.description;
        this.MaxTemp = result.main?.temp_max;
        this.MinTemp = result.main?.temp_min;
        this.Humidity = result.main?.humidity;
        this.Wind = result.wind?.speed;
        this.Visibility = result.visibility;
        this.Icon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
        this.searchHistory.push({
          term: city,
          icon: this.Icon,
          temp: this.Tempeture,
          description: this.WeatherDesc,
        });
      } catch (error:any) {
        if (error.message === 'Failed to fetch') {
          this.WeatherDesc = 'Unable to fetch weather data. Please check your internet connection.';
        } else if (error.message === 'You have exceeded the MONTHLY quota for Requests') {
          this.WeatherDesc = 'You have exceeded the monthly quota for requests.';
        } else {
          this.WeatherDesc = 'An error occurred while fetching weather data.';
        }
        this.City = ''
        this.Country = ''
        this.Tempeture = 0
        this.MaxTemp = 0
        this.MinTemp = 0
        this.Humidity = 0
        this.Wind = 0
        this.Visibility = 0
        this.Icon = '../../../assets/notfound.png'
      }
    }else{
      this.WeatherDesc = 'Please enter valid data'
    }
  }


  setWeatherData(data: any) {
    // this.WeatherData = data
    // this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0)
    // this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0)
  }
  getCurrentTimeDay() {
    // Create a new Date object
    var currentDate = new Date();

    // Define an array of weekdays
    var weekdays = ['Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat,'];
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var monthIndex = currentDate.getMonth();

    // Extract the weekday index (0-6) from the Date object
    var weekdayIndex = currentDate.getDay();

    // Get the weekday name using the index
    var weekday = weekdays[weekdayIndex];
    var month = months[monthIndex];

    // Extract the date, year, hours, minutes, and seconds from the Date object
    var date = currentDate.getDate();
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    // Format the time component as a string in 12-hour format with AM/PM indicator
    var period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    var time =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      period;
    this.output = weekday + ' ' + date + ' ' + month + ' ' + year + ' ' + time;
  }
  logInput() {
    console.log(this.inputValue);
    this.getWeatherData(this.inputValue);
  }
  toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteList.push({
        term: this.inputValue,
        icon: this.Icon,
        temp: this.Tempeture,
        description: this.WeatherDesc
      });
    } else {
      this.favoriteList = this.favoriteList.filter(item => item.term !== this.inputValue);
    }

    this.isFavorite = false;
  }

}
