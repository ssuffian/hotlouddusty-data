#!/usr/bin/env python
from datetime import datetime
import os
import pandas as pd
import requests


def get_weather_com_historical_data(from_date, to_date, weather_station, api_key):
    weather_data = []
    for date in pd.date_range(from_date, to_date, freq='D'):
        print("Requesting weather data for {} at station {}".format(date, weather_station))
        response = requests.get(
            'https://api.weather.com/v2/pws/history/all'
            '?stationId={weather_station}&date={date}'
            '&format=json&units=e&numericPrecision=decimal'
            '&apiKey={api_key}'.format(date=date.strftime('%Y%m%d'), weather_station=weather_station, api_key=api_key)
        )
        response_json = response.json()
        weather_data.extend([{**obs['imperial'],**{'datetime': obs['obsTimeLocal']}} for obs in response_json['observations']])
    return pd.DataFrame(weather_data)

if __name__ == '__main__':
    from_date  = datetime(2019,8,18)
    to_date = datetime(2019,9,3)
    weather_station = 'KNVGERLA7'

    api_key = os.environ.get('WEATHER_COM_API_KEY')
    df = get_weather_com_historical_data(from_date, to_date, weather_station, api_key)
    df.to_csv('data/weather/gerlach_weather.csv', index=False)
