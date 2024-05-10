import "./PortfolioLayouts.css";
import { useState, useRef, useEffect } from "react";
import Component from "../Component";


export default function BasicLayout({portfolioContent}) {

    return (
        <div id='section1' className="portfolio-basic_layout column" >
            {portfolioContent.section1 && portfolioContent.section1.components && (
                portfolioContent.section1.components.map((component) => {
                    return (
                        <Component component={component.component} />
                    ) 
                })
            )}
        </div>
    )
}