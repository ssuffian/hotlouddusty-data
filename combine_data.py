#!/usr/bin/env python
import pandas as pd
import os
from bs4 import BeautifulSoup

data_dir = 'data'

gps_path = os.path.join(data_dir, 'gps/')
dust_path = os.path.join(data_dir, 'dust/dusty.csv')
out_path = os.path.join(data_dir, 'bm2019_pm_data.csv')

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


if __name__ == '__main__':
    # Resample so that join works well
    df_gps = get_gps_dataframe(gps_path).resample('60S').mean()
    df_dust = get_dust_dataframe(dust_path).resample('60S').mean()
    df = df_gps.join(df_dust)
    # Slice for BM 2019 (remove test values)
    df = df['2019-08-23':'2019-09-02'].dropna()
    df.to_csv(out_path, index_label='datetime')
