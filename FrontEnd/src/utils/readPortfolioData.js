// import PortfolioData from "..";
import fs from 'fs'; // Import the file system module
const PortfolioData = '../Portfolio.json';

export function getLayout() {
    if (PortfolioData && PortfolioData.layout) {
        // console.log("getLayout: ", PortfolioData.layout);
        return PortfolioData.layout;
    }
    return null;
}


function getFileJson() {
    try {
        const data = fs.readFileSync(PortfolioData, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return null;
    }
}

