import "./PortfolioLayouts.css";
import Component from "../Component";


export default function Layout2({portfolioContent}) {
    return (
        <div id="portfolio-layout2">
            <div id="section1" className="column" style={{width: "50%"}}>
                {portfolioContent.section1 && portfolioContent.section1.components && (
                    portfolioContent.section1.components.map((component) => {
                        return (
                            <Component component={component.component} />
                        ) 
                    })
                )}
            </div>
            <div id="section2" className="column" style={{width: "50%"}}>
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