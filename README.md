## Visualizations 

- [Zoomable/Brushable Time Series Plot](https://ssuffian.github.io/hotlouddusty-data/timeseries.html)
- [Jupyter Notebook](https://nbviewer.jupyter.org/github/ssuffian/hotlouddusty-data/blob/master/ipynb/initial_analysis.ipynb)


## Description

This repository contains scripts for analyzing particular matter data collected at Burning Man in 2019 using code from [this repository](https://github.com/ssuffian/hotlouddusty), which was installed on a Raspberry Pi Zero connected to a RTC and an SDS-011 PM2.5/10 sensor. 

```
data
├────dust
│    └───dusty.csv
├────gps
│    └───*.gpx
└────bm2019_pm_data.csv
README.md
combine_data.py
```


Contributors
------------

- [Stephen Suffian](https://github.com/ssuffian)
- [Chris Ballinger](https://github.com/chrisballinger)

This code is derived from
-------------------------
- [GeoJson Time Series](https://github.com/skeate/Leaflet.timeline)
- [d3 Brush and Zoom](https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172)
