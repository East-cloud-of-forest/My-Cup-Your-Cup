import DesignsGrid from './DesignsGrid.scss'

export default function AllDesigns() {
    return (
        <>
            <div className='header'>
                <span id='title'>전체보기</span>
                <a href="#">더보기</a>
            </div>
            
            <ul className="design_thumb">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </>
    )
}