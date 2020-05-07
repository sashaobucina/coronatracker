import React from "react";
import { scaleThreshold } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";
import { HEATMAP_COLORS } from "./colors";
import { rounded } from "../../helpers/conversions";
import worldMap from "../../static/world-110m.json";

const VALUES = [
  100,
  500,
  1000,
  5000,
  10000,
  25000,
  50000,
  100000,
  250000
];

const colorScale = scaleThreshold()
  .domain(VALUES)
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
          <Geographies geography={worldMap}>
            {({ geographies }) => {
              return geographies.map(geo => {
                const { NAME, NAME_LONG, FORMAL_EN, ISO_A2 } = geo.properties;
                const possibilites = [NAME, NAME_LONG, FORMAL_EN, ISO_A2];

                // handling misnamings
                if (NAME === "South Korea") possibilites.push("Korea, South");
                if (NAME === "Taiwan") possibilites.push("Taiwan*");
                if (NAME === "Macedonia") possibilites.push("North Macedonia");
                if (NAME === "Myanmar") possibilites.push("Burma");
                if (NAME === "Congo") possibilites.push("Congo (Brazzaville)");
                if (NAME === "Dem. Rep. Congo") possibilites.push("Congo (Kinshasa)");

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