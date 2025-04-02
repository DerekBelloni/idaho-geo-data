import { json } from "d3-fetch";
import { select } from "d3-selection";
import { geoAlbers, geoPath, getAlbers } from 'd3-geo';

function renderMap(counties) {
    const svg = select('#map')
        .append('svg')
        .attr('width', 960)
        .attr('height', 600)

    const projection = geoAlbers()
        .fitSize([960, 600], { type: 'FeatureCollection', features: counties});

    const path = geoPath.projection(projection);

    svg.selectAll('path')
        .data('counties')
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#ccc')
        .attr('stroke', '#fff')
}


json('idaho_counties.geojson')
    .then((data) => {
        counties = data.features;
        renderMap(counties);
}).catch((error) => {
        console.error("Couldn't extract counties from geo json: ", error);
});