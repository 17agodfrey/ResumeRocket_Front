import BasicLayout from "./portfolio-layouts/BasicLayout";
import Layout2 from "./portfolio-layouts/Layout2";
import Layout3 from "./portfolio-layouts/Layout3";



function Layout({layout, portfolioContent}) {
    return (
        <>
            {layout && layout === "basic" && (
                <BasicLayout 
                    portfolioContent={portfolioContent}
                />
            )}           
            {layout && layout === "2" && (
                <Layout2 
                    portfolioContent={portfolioContent}                 
                />
            )}  
            {layout && layout === "3" && (
                <Layout3 
                    portfolioContent={portfolioContent}                
                />
            )}                                               
        </>
    )
}


export default function PortfolioContent({portfolioContent}) {
    console.log("portfolioContent:", portfolioContent);

    return (
        <>
            {portfolioContent.layout && (
                <Layout 
                    layout={portfolioContent.layout} 
                    portfolioContent={portfolioContent} 
                />
            )}
        </>
    )
}
