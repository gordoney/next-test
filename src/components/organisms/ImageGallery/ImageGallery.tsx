import { useRef } from "react";
import Slider from "react-slick";
import { useShallow } from "zustand/react/shallow";
import clsx from "clsx";
import Lightbox, { ZoomRef } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ImageGallery.module.scss";
import BREAKPOINT_TABLE from "../../../constants/breakpoints";
import useImageGalleryStore from "../../../stores/useImageGalleryStore";

interface Props {
  images: {
    url: string;
    id: string;
  }[];
}

function ImageGallery({ images }: Props) {
  const zoomRef = useRef<ZoomRef>(null);
  const {
    index: galleryIndex,
    setIndex: setGalleryIndex,
    isOpen,
    setIsOpen,
    isOpeningWithZoom,
    setIsOpeningWithZoom,
    zoomValue,
    zoomOffsetX,
    zoomOffsetY,
    setZoom,
  } = useImageGalleryStore(
    useShallow((state) => ({
      index: state.index,
      setIndex: state.setIndex,
      isOpeningWithZoom: state.isOpeningWithZoom,
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
      setIsOpeningWithZoom: state.setIsOpeningWithZoom,
      zoomValue: state.zoomValue,
      zoomOffsetX: state.zoomOffsetX,
      zoomOffsetY: state.zoomOffsetY,
      setZoom: state.setZoom,
    })),
  );
  const lighboxImages = images.map((i) => ({ src: i.url }));

  const handleOnImageClick = (index: number) => {
    setIsOpeningWithZoom(true);
    setGalleryIndex(index);
    setIsOpen(true);
  };

  const handleOnCloseLightbox = () => {
    setIsOpen(false);
  };

  const imagesList = images.map((image, index) => (
    <div key={image.id}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          className={styles.lightboxButton}
          type="button"
          onClick={() => handleOnImageClick(index)}
        >
          <img
            data-testid={`image-gallery-image-${index}`}
            className={styles.image}
            src={image.url}
            alt=""
          />
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <Slider
        swipeToSlide
        infinite={false}
        centerPadding="28px"
        slidesToShow={3}
        responsive={[
          {
            breakpoint: BREAKPOINT_TABLE,
            settings: {
              slidesToShow: 1,
              centerMode: true,
            },
          },
        ]}
      >
        {imagesList}
      </Slider>

      <Lightbox
        open={isOpen}
        close={handleOnCloseLightbox}
        slides={lighboxImages}
        plugins={[Zoom]}
        zoom={{ ref: zoomRef, maxZoomPixelRatio: 3 }}
        index={galleryIndex}
        on={{
          entered: () => {
            if (isOpeningWithZoom) {
              zoomRef.current?.changeZoom(zoomValue, true, zoomOffsetX, zoomOffsetY);
            }
            setZoom(0, 0, 0);
            setIsOpeningWithZoom(false);
          },
        }}
        className={clsx(isOpeningWithZoom && "image-gallery-zooming")}
      />
    </>
  );
}

export default ImageGallery;
