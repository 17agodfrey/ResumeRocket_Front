import "./PortfolioLayouts.css";
import Component from "../Component";


export default function Layout3({portfolioContent}) {
    return (
        <div id="portfolio-layout3">
            <div id="section1" className="column" style={{width: "30%"}}>
                {portfolioContent.section1 && portfolioContent.section1.components && (
                    portfolioContent.section1.components.map((component) => {
                        return (
                            <Component component={component.component} />
                        ) 
                    })
                )}
            </div>     
            <div id="section2" className="row" style={{width: "70%"}}>
                {portfolioContent.section2 && portfolioContent.section2.components && (
                    portfolioContent.section2.components.map((component) => {
                        return (
                            <Component component={component.component} />
                        ) 
                    })
                )}                
            </div>
        </div>
    )
}