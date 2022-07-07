import { ModalComp } from '../index-comp/IndexComp'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'
import './FreeDesignComp.scss'
import { useEffect, useState } from 'react'

const FreeDesignComp = ({ button, active }) => {
  const storage = getStorage()
  const listRef = ref(storage, 'freeDesign')
  const [images, setImages] = useState([])

  const getImages = async () => {
    const imgArray = []
    await listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          const img = new Image()
          img.src = itemRef.fullPath
          img.onload = () => {
            console.dir(img.currentSrc)
            imgArray.push(img.currentSrc)
          }
          getDownloadURL(ref(storage, img.currentSrc)).then((r) =>
            console.log(r),
          )
        })
      })
      .catch((e) => {
        console.log(e)
      })
    setImages(imgArray)
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <>
      {active ? (
        <ModalComp button={button}>
          <div className="freedesigncomp">
            <h3>무료 디자인</h3>
            <div className="free_images">
              {images.map((img, i) => (
                <img src={img} key={i}></img>
              ))}
            </div>
          </div>
        </ModalComp>
      ) : (
        button
      )}
    </>
  )
}

export default FreeDesignComp
