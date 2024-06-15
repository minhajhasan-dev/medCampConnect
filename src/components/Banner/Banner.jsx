// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./banner.css";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Container from "../Shared/Container";

const Banner = () => {
  return (
    <Container>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 3,
          },

          0: {
            slidesPerView: "auto",
          },
        }}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1000}
        className="mySwiper mb-10"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default Banner;
