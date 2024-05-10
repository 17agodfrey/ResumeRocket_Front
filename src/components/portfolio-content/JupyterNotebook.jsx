import jupyter from "../../assets/jupyter.png";

export default function JupyterNotebook({ component }) {
    const notebookStyle = {
        backgroundColor: '#f5f5f5',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        ...component.styles // Merge with any additional styles passed in props
    };

    return (
        <div id="portfolio-jupyter_notebook" style={notebookStyle}>
            {/* <div style={{widthheight: 'fit-content'}}> */}
                <img src={jupyter} alt="jupyter" style={{ height: '5rem', width: '5rem' }} />
            {/* </div> */}
        </div>
    );
}

