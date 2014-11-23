GeoDataPointCleanup-php
=======================

Clean a  set of geographic data points by removing erroneous entries.
Develop a program that, given a series of points (latitude, longitude, timestamp) for a cab journey from A to B, will disregard potentially erroneous points.

Overview
========
Map.html uses leaflet.js to render the "uncleaned" data points on a map.
These data points are then analysed using javascript and any erroneous data points are removed.
The resulting "cleaned" data points are then also rendered.
