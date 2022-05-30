import './Profile.scss'

export default function Profile() {
    return(

        <div className="profile">
            <div className="circle picture_wrapper">
                <img src="https://cdn.pixabay.com/photo/2022/04/07/15/13/farming-7117714_960_720.jpg" alt="profile photo"></img>
            </div>
            
            <div className="text">
                <span id='username'>User1</span>
                <p id='intro'>I am User1. My websites</p>
            </div>
            <div className='social'>
                <a href="#">
                    f 
                </a>
                <a href="#">
                    insta
                </a>
            </div>
            
        </div>
    )
}