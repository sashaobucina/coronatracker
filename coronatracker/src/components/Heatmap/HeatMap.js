import React from "react";
import { scaleThreshold } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";
import { HEATMAP_COLORS, HEATMAP_VALUES } from "../../helpers/misc";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000) {
    return Math.round(num / 100) / 10 + "K";
  } else {
    return num
  }
};

const colorScale = scaleThreshold()
  .domain(HEATMAP_VALUES)
  .range(HEATMAP_COLORS);

export default function HeatMap(props) {
  const { data, position, handleMoveEnd, setContent } = props;

  return (
    <ComposableMap
      data-tip=""
      projection="geoNaturalEarth1"
      projectionConfig={{ scale: 157 }}
      height={450}
    >
      <ZoomableGroup
        center={position.coordinates}
        zoom={position.zoom}
        onMoveEnd={handleMoveEnd}
      >
        <Graticule strokeWidth={0.75} strokeOpacity={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              return geographies.map(geo => {
                const { NAME, NAME_LONG, FORMAL_EN, ISO_A2 } = geo.properties;
                const possibilites = [NAME, NAME_LONG, FORMAL_EN, ISO_A2];
                const d = data.find(entry => possibilites.includes(entry.country));
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setContent(`${NAME} - ${d ? rounded(d.value) : "N/A"}`)}
                    onMouseLeave={() => setContent("")}
                    fill={d ? colorScale(d.value) : "#d4d4d4"}
                  />
                );
              })
            }}
          </Geographies>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
}