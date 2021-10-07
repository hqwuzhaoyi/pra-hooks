import React from 'react';
import { Carousel } from 'pra-hooks';
import Img1 from './images/fire1.jpg';
import Img2 from './images/fire2.jpg';
import Img3 from './images/fire3.jpg';
import Img4 from './images/fire4.jpg';

const imgItemStyle = {
  width: 300,
  height: 150,
};

const ImageDataSource = [Img1, Img2, Img3, Img4];

const basic = () => {
  return (
    <Carousel
      width="120"
      dataSource={ImageDataSource.map((src) => src)}
    ></Carousel>
  );
};

export default basic;
