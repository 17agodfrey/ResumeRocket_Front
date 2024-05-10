import Introduction from "./portfolio-content/Introduction";
import JupyterNotebook from "./portfolio-content/JupyterNotebook";



export default function Component({key, component}) {
    return (
        <>
            {component && component.type === "introduction" && (
                <Introduction component={component}/>
           )}
            {component && component.type === "jupyter" && (
                <JupyterNotebook component={component}/>
           )}           
        </>
    )
}
