## Visualizations 

- [Zoomable/Brushable Time Series Plot](https://ssuffian.github.io/hotlouddusty-data/timeseries.html)
- [Map Timeline](https://ssuffian.github.io/hotlouddusty-data/map.html)
- [Jupyter Notebook](https://nbviewer.jupyter.org/github/ssuffian/hotlouddusty-data/blob/master/ipynb/initial_analysis.ipynb)


## Description

This repository contains scripts for analyzing particular matter data collected at Burning Man in 2019 using code from [this repository](https://github.com/ssuffian/hotlouddusty), which was installed on a Raspberry Pi Zero connected to a RTC and an SDS-011 PM2.5/10 sensor. 

```
data
├────dust
│    └───dusty.csv
├────weather
│    └───gerlack_weather.csv
├────gps
│    └───*.gpx
└────bm2019_pm_data.csv
README.md
combine_data.py
get_weather.py
```

## Weather Data

Fetching Weather data requires a weather underground API key. You can sign up for one if you have a weather station, then use `get_weather.py` to get weather data. You will need to load the api key as an environment variable like so (if your api key was 1234567890):

        export WEATHER_COM_API_KEY=1234567890

However the data from Gerlach for Burning Man 2019 has already been fetched and is in `data/weather/gerlach_weather.csv`.

## Map Timeline

This visualization is derived (with minimal edits) from Leaflet.Timeline's [Earthquake](http://skeate.github.io/Leaflet.timeline/earthquakes.html) example. It requires that the air quality data (`data/dust/dusty.csv`) and GPS data (`data/gps/*.gpx`) has been merged and subsequently converted to geojson format and stored in the `data` directory when running the `python combine_data.py` command.

The `leaflet.timeline.js` file was compiled using [this repo](https://github.com/skeate/Leaflet.timeline), with an updated package.json that can be found in `leaflet/leaflet-timeline-package.json`.

        git clone https://github.com/skeate/Leaflet.timeline.git
        cp leaflet/leaflet-timeline-package.json Leaflet.timeline/package.json 
        cd Leaflet.timeline
        npm install
        npm run build
        cp dist/leaflet.timeline.js ../leaflet/

Contributors
------------

- [Stephen Suffian](https://github.com/ssuffian)
- [Chris Ballinger](https://github.com/chrisballinger)

This work is derived from
-------------------------
- [GeoJson Time Series](https://github.com/skeate/Leaflet.timeline)
- [d3 Brush and Zoom](https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172)
- [Leaflet Timeline 1.2.1](https://github.com/skeate/Leaflet.timeline)
- [Leaflet (v1.2.0)](https://github.com/Leaflet/Leaflet)

To Do
-----
- Link to wind data from Black Rock Airport.
- Link to photos for visual dust confirmation.
