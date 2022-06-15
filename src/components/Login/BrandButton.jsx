import { ButtonComp } from '../index-comp/IndexComp'

function BrandButton({children, src, color}) {
  return (
    <div>
      <ButtonComp
        color={color}
        style={{border: '1px solid lightgrey',
        padding: "0 0.5rem",
        margin: "0",
        height: "55px",
        color:color!=="white"?"white":"black"
        }}
      >
        <div>
          <img style={{width: '25%'}} src={src} />
          {children}
        </div>
      </ButtonComp>
    </div>
  )
}

export default BrandButton
