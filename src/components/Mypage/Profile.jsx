import './Profile.scss'

export default function Profile() {
    return(

        <div className="profile">
            
            <div className="circled_container">
                <img src="https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg" alt="profile photo"></img> 
            </div>
            
            <div className="text">
                <span id='username'>User1</span>
                <p id='intro'>I am User1. My websites are </p>
                <div className='social'>
                    <a href="#">
                        <img src='https://www.svgrepo.com/show/299115/facebook.svg'></img> 
                    </a>
                    <a href="#">
                        <img src='https://www.svgrepo.com/show/299116/instagram.svg'></img>
                    </a>
                </div>
            </div>
            
            
        </div>
    )
}