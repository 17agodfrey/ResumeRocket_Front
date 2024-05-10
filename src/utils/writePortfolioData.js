// import * as rPD from './readPortfolioData';

const PortfolioData = '../Portfolio.json';


export function updateLayout(layoutType) {
    console.log("updateLayout");
    const p = getFileJson();
    p.layout = layoutType;
}

export function removeLayout() {
    console.log("removeLayout");
}

export function addSection() {
    console.log("addSection");
}

export function removeSection() {
    console.log("removeSection");
}

export function updateSection() {
    console.log("updateSection");
}

////////////////////////////////////////////////////////////////////////////

// function getFileJson() {
//     const fileReader = new FileReader();
//     fileReader.onload = function() {
//         const data = fileReader.result;
//         return JSON.parse(data);
    
// }

// function getFileJson() {
//     try {
//         const data = fs.readFileSync(PortfolioData, 'utf8');
//         const parsedData = JSON.parse(data);
//         console.log("data: ", data);
//         console.log("parsedData: ", parsedData);
//         return parsedData;
//     } catch (err) {
//         console.error(err);
//         return null;
//     }
// }

