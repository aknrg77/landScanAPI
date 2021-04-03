const turf = require('@turf/turf');


const parseAreaVectors = (result) =>{
    for (x of result){
        x.area = turf.area(turf.polygon(x.polygon.geometry.coordinates));
    }
    return result;
}

const parsePerimeterVectors = (result) =>{
    for (x of result){
        x.perimeter = turf.length(turf.polygon(x.polygon.geometry.coordinates));
    }
    return result;
}

module.exports = {
    parseAreaVectors,
    parsePerimeterVectors
}