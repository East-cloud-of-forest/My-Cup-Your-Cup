


import google from "./img/구글 로그인 버튼.png"


function GoolgeButton() {

    return (
        <div>
        <a href="https://accounts.google.com/ServiceLogin?hl=ko&passive=true&continue=https://www.google.co.kr/&ec=GAZAmgQ">
        <img style={{
            padding: "17px",
            paddingTop: "30px",
            width: "250px"
            }} src={google} />
        </a>
    </div>
    )
}

export default GoolgeButton