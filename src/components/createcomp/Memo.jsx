const Memo = ()=>{
    function alertfunc(money){
        alert(money);
    }

    return (
        <div>
            <Child money={10000} alertfunc={alertfunc}/>
        </div>
    );
};

const Child = (props) => {
    return (
        <div>
            <br />
            <b>childM : {props.money}</b>
            <br />
            <button
            onClick={()=>{props.alertfunc(props.money)}}
            >프롭스전달</button>
        </div>
    )
}



export default Memo;