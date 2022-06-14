const ColorComp = ({colorData,getColorData}) =>{

    const colors =[
        {code:"#FFFFFF",name:"white"},
        {code:"#ff8e8e",name:"red"},
        {code:"#5555ff",name:"blue"},
        {code:"#333333",name:"black"},
        {code:"#ffff80",name:"yellow"},
        {code:"#8aff8a",name:"green"},
    ];

    const colorSelect = (e) =>{
        getColorData(e.target.id);
    }

    return (
        <div className="cre_colorDiv">
            {
                colors.map(color=>(
                    <div className="cre_color" id={color.code} key={color.code} style={{backgroundColor:color.code}} onClick={colorSelect}></div>
                ))
            }
        </div>
    )
}

export default ColorComp