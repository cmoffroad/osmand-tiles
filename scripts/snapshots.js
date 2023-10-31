const { processSnapshots } = require('./lib');

const obfs = {
  latest: ['Thailand_asia.srtm', 'Thailand_asia'],
  2020: ['Thailand_asia.srtm', 'Chiangmai-200101']
}

const zoom = 13;


processSnapshots(obfs, 'doi-mon-ngo', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/19.141279945598498/98.78310464322567&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'samoeng-south', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.7620394380547/98.67446927373197&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'mae-rim', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.95221280228806/98.79362694919111&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'doi-mon-lan', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/19.483556396738397/99.3281062839093&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'chiang-dao', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/19.297740210722907/98.86838816106321&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'samoeng-north', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.985805606984897/98.65548044443132&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'doi-lanka', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.946400878789568/99.35811057686807&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces')
processSnapshots(obfs, 'mae-takhrai', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.798984281609584/99.34845730662349&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'lamphun', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.66579707920592/99.24496695399284&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'doi-suthep', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.83086189847519/98.86510245501997&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'doi-inthanon', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.60196590366656/98.58392916619779&background=worldtopomap&overlays=cmoffroad:explorer,osm:gps_traces');
processSnapshots(obfs, 'chomthong', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.40300834741832/98.4969585388899&background=worldtopomap&overlays=cmoffroad:explorer');
processSnapshots(obfs, 'mae-chaem', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/18.475043957563074/98.35591457784176&background=worldtopomap&overlays=cmoffroad:explorer');
processSnapshots(obfs, 'mae-ya', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/19.18345604410202/98.56344781816006&background=worldtopomap&overlays=cmoffroad:explorer');
processSnapshots(obfs, 'muang-khong', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/19.374554004279393/98.6808414012194&background=worldtopomap&overlays=cmoffroad:explorer');
processSnapshots(obfs, 'wiang-haeng', 'file:///Users/julien/Workspaces/OSM/osm-tools/maps/gps.html#map=13/19.655991859268052/98.63981567323208&background=worldtopomap&overlays=cmoffroad:explorer');