import { json } from "d3-fetch";
import { renderMap } from "./services/IdahoMap";
import D3Config from "./services/d3";


let d3Dir = null;

document.addEventListener('DOMContentLoaded', async () => {
    const d3Config = new D3Config();
    d3Dir = await d3Config.getD3Directory();
})

// json('idaho_counties.geojson')
//     .then((data) => {
//         const counties = data.features;
//         renderMap(counties);
// }).catch((error) => {
//         console.error("Couldn't extract counties from geo json: ", error);
// });

