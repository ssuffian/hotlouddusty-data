#!/usr/bin/env python
from bs4 import BeautifulSoup
from datetime import datetime
import json
import os
import pandas as pd
import pytz

data_dir = 'data'

gps_path = os.path.join(data_dir, 'gps/')
dust_path = os.path.join(data_dir, 'dust/dusty.csv')
out_path_csv = os.path.join(data_dir, 'bm2019pm.csv')
out_path_geojsonp = os.path.join(data_dir, 'bm2019pm.geojsonp')

def get_gps_dataframe(gps_path):
    locs = []
    for filename in os.listdir(gps_path):
        gpx = open('{}/{}'.format(gps_path, filename), 'r').read()
        soup = BeautifulSoup(gpx, "lxml-xml")
        locs.extend([
            {
                'lat': float(location.attrs['lat']),
                'lon': float(location.attrs['lon']),
                'time': location.time.text
            } for location in soup.find_all('trkpt')
        ])
    df_loc = pd.DataFrame(locs)
    df_loc.index = pd.to_datetime(df_loc['time'])
    df_loc.drop(axis=1, columns=['time'], inplace=True)
    return df_loc

def get_dust_dataframe(dust_path):
    df = pd.read_csv(dust_path)
    df.index = pd.to_datetime(df['datetime'])
    df.drop(axis=1, columns=['datetime'], inplace=True)
    return df


def create_geojson_feature(row):
    time = row['datetime']
    lat = row['lat']
    lon = row['lon']
    pm25_value = round(float(row['pm2.5']), 1)
    pm10_value = round(float(row['pm10']), 1)
    data_type = "air_quality"
    text = '{}<br>PM2.5: {}<br>PM10: {}'.format(time.isoformat(), pm25_value, pm10_value)

    def _get_epoch_time_ms(this_time):
        # Convert to Burning Man timezone then strip timezone info.
        this_time = (
            this_time.tz_localize('America/Los_Angeles').\
            astimezone(pytz.UTC).replace(tzinfo=None)
        )
        return (this_time - datetime(1970,1,1,0,0,0)).total_seconds() * 1000.0

    return {"type":"Feature",
            "properties":
             {
                  "pm25": pm25_value,
                  "time": _get_epoch_time_ms(time),
                  "iso_time": time.isoformat(),
                  "text": text,
             },
             "geometry":{
                 "type":"Point","coordinates":[lon, lat, 1]
             },
        }

def get_geojson_from_dataframe(df):
    # Generate geojson
    df['datetime'] = df.index
    features = [create_geojson_feature(row) for index, row in df.iterrows()]
    geojson = {
        "type":"featurecollection","metadata": {},
        "features": features
    }
    return 'eqfeed_callback({})'.format(json.dumps(geojson))

if __name__ == '__main__':
    # Resample so that join works well
    df_gps = get_gps_dataframe(gps_path).resample('60S').mean()
    df_dust = get_dust_dataframe(dust_path).resample('60S').mean()
    df = df_gps.join(df_dust)
    # Slice for BM 2019 (remove test values)
    df = df['2019-08-23':'2019-09-02'].dropna()
    df.to_csv(out_path_csv, index_label='datetime')
    geojson = get_geojson_from_dataframe(df)

    with open(out_path_geojsonp, 'w') as outfile:
        outfile.write(geojson)

