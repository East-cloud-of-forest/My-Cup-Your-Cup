import "./style.scss";

const ColorComp = (props) =>{

    const colors =[
        {code:"#FFFFFF",name:"white"},
        {code:"#FF0000",name:"red"},
        {code:"#0000FF",name:"blue"},
        {code:"#000000",name:"black"},
    ];

    return (
        <div className="cre_colorDiv">
            {colors.map(color=>(<div className="cre_color" key={color.code} style={{backgroundColor:color.code}}></div>))}
        </div>
    )
}

export default ColorComp