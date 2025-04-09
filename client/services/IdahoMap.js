import { geoAlbersUsa, geoPath, geoTransform } from 'd3-geo';
import { select } from 'd3-selection';

export const renderMap = (counties) => {    
    // Step 1: Clear the container to avoid nested SVGs
    const mapContainer = select('#map');
    mapContainer.selectAll('*').remove();

    // Step 2: Set up the SVG canvas
    const svg = mapContainer
        .append('svg')
        .attr('width', 960)
        .attr('height', 600);

    // Step 3: Calculate geographic bounds
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    counties.forEach(feature => {
        const coords = feature.geometry.coordinates;
        if (feature.geometry.type === 'Polygon') {
            coords[0].forEach(([lon, lat]) => {
                minLon = Math.min(minLon, lon);
                maxLon = Math.max(maxLon, lon);
                minLat = Math.min(minLat, lat);
                maxLat = Math.max(maxLat, lat);
            });
        }
    });
    console.log('Geographic bounds:', { minLon, maxLon, minLat, maxLat });

    // Step 4: Create the base projection with geoAlbersUsa
    const baseProjection = geoAlbersUsa()
        .fitSize([960, 600], { type: 'FeatureCollection', features: counties });

    // Step 5: Create a rotation transform to rotate 90 degrees clockwise
    const transform = geoTransform({
        point: function(x, y) {
            // First, project the geographic coordinates using geoAlbersUsa
            const [px, py] = baseProjection([x, y]);
            console.log('x: ', x)
            // Rotate 90 degrees clockwise: swap x and y, then flip x
            // const rotatedX = -py;
            // const rotatedY = px;
            // Center the rotated map
            this.stream.point(px + 480, py + 300); // Center at (480, 300)
        }
    });

    // Step 6: Use the transform directly as the projection
    const projection = transform;

    // Step 7: Create a path generator with the projection
    const path = geoPath().projection(projection);

    // Step 8: Check for rendering failures
    console.log('Total features:', counties.length);
    counties.forEach((feature, i) => {
        console.log(`Feature ${i} geometry type:`, feature.geometry.type);
        const pathData = path(feature);
        if (!pathData) {
            console.log(`Path generation failed for feature ${i}:`, feature.geometry);
        }
        const firstCoord = feature.geometry.coordinates[0][0];
        const projected = baseProjection(firstCoord);
        console.log(`Feature ${i} first projected coordinate:`, projected);
    });

    // Step 9: Bind data and render paths
    svg.selectAll('path')
        .data(counties)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#ff0000')
        .attr('stroke', '#000') // Black borders for higher contrast
        .attr('stroke-width', 3); // Thicker lines
}