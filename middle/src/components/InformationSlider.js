import '../css/slick-theme.css';
import '../css/slick.css'
import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import InformationBox from "./InformationBox";

export default function InformationSlider() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    dots:true,


  };

  return (

    <Slider {...settings}>
      <InformationBox place={"미아역"} time={11} />
      
      <InformationBox place={"수유역"} time={8} />
      
      <InformationBox place={"성신역"} time={20} />
      
    </Slider>

  );
}


