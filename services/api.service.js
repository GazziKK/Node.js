import axios from 'axios';
import { printInfo } from './log.service.js';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async () => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token)
    const city = await getKeyValue(TOKEN_DICTIONARY.city)
    if (!token.length) {
        printInfo(`Before get weather you need set token.
        You can set token with command '-t [option]'
        `)
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ua',
            units: 'metric',
        }
    });
    return data;
} 

export { getWeather };