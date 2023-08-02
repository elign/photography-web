import "../style.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export default function Gallery() {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "portfolio/");
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item, idx) => {
        getDownloadURL(item).then((url) => {
          setImageList((prevValue) => [...prevValue, { id: idx, imgSrc: url }]);
        });
      });
    });
    console.log(imageList);
  }, []);

  // Data structure of Image data
  // let data = [
  //   {
  //     id: 1,
  //     imgSrc: ""
  //   },
  // ];

  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(imageList.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  // Next Image
  const nextSlide = () => {
    slideNumber + 1 === imageList.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  return (
    <>
      {openModal && (
        <div className="sliderWrap">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="btnClose fa-2x"
            onClick={handleCloseModal}
          />
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            className="btnPrev fa-2x"
            onClick={prevSlide}
          />
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className="btnNext fa-2x"
            onClick={nextSlide}
          />
          <div className="fullScreenImage">
            <img src={imageList[slideNumber].imgSrc} alt="" />
          </div>
        </div>
      )}
      <div className="gallery" ref={parent}>
        {imageList.map((item, idx) => {
          return (
            <div
              className="pics"
              key={idx}
              onClick={() => handleOpenModal(idx)}
            >
              <img style={{ width: "100%" }} src={item.imgSrc} alt="" />
            </div>
          );
        })}
      </div>
    </>
  );
}
