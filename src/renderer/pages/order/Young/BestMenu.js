import React, { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
import "./BestMenu.css";
// import rotiesserie from "./rotiesserie.png";
// import mushroom from "./mushroom.png";

const BestMenu = () => {
  const images = useRef([
    {
      src: "https://s3-alpha-sig.figma.com/img/df65/3bf0/e12739b99a03b0f0ddc142829f0da7e2?Expires=1664150400&Signature=W5q2IZD5KWWOFm6LdqwCiW6lFU-0kPalq~qnTx5m97CXcYg-F01UkGGRheMNfAP9hC-rIOimK-ezWkSSGBYuYwDNLCcU7~pTJ4dBRj9LOAJ-SGFLnaXk5k1rK~6APf53lTKbE1saWzVXUsHxXF6nQFjeIUPdqLCtKI3ot5egivt1ke7tcVNusV4K8AS-RkO4IgvODKHCBBMUL7TP9SH6d6NjAGs3ZB~43MzZjiBvissqajDAEI4zRFWv6EQgFvc-3mDv52mGvbU7bzLJe9DInwvi9qTWRdMF-3RPJG3ffR78YYFTnbI11KZwrREi~8afzywrCDFDyP~mvohENvMovg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
      src: "https://s3-alpha-sig.figma.com/img/91df/ad7c/223b9aa34f1d8e2d5e8fa50081d6cd70?Expires=1664150400&Signature=XCE6DXBBRXLP9B6vzYsYLArj5zij76eYHIerInO~sBg3pxgitrkSYdqpO5~R0HlB6KeHT7q4r0n9-MAGmk96bkzJyCrF9EeMgSAErqjoLNLxv9GVCrAVo8-yyWQEocpzOkYOdFGp30KRSmjn3ky-r5Uy4V2F4gd8usCs9uROqqH-w3EbfcVVWylqcOkMCV~jZlxn6~ASQmIBdMOluxMNzunsO891m8xKeEY0UzGvZEjfMM4vY8y6103q1RDSaEc~vrMp~nDBmAIyE6qUS3vmarARC-ysxlADNTAEuLhX9YOw0OhxcYlR~tco5O7czY5Op-lrr0f8TQPTsaURwYVnmQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
      src: "https://s3-alpha-sig.figma.com/img/209e/d48b/0269c9d42942111cc532138085a76627?Expires=1664150400&Signature=VjBEhQDef8K8yIkrmn04oBYzaRn~KmStnprQUfC52JB~TvvxDTQIrg2L9UAaMqxOheaDA3KJlVJzgIAvfMoFrsQoG5If9ixEA37SIwUbs~jc2twroNO7xCNqTD1S68zEWuTkvZN0jgO8KzDCWPyvRd6T04KGFTjsm0pDaQpzUc2I84lBTKB-F1cYB6GFHuSLe9wPwRodL~E6KggiOSAd3r0TfEZGbnR6pYk7xaG-vxkPoJvq-9nq3cG7gAUcZXbk6Rsj4OSALCVhbRudup23tSRzxKn82t8eJNlzw4PdX1ysd6qNZg~uzdiCGBEziCkjcsaKaPVNllRCTwFBaL8cKw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  });
  const imgSize = useRef(images.current.length);

  const moveSlide = (i) => {
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  return (
    <div className="container">
      <div className="slide">
        <div
          className="btn"
          onClick={() => {
            moveSlide(-1);
          }}
        >
          &lt;
        </div>
        <div className="window">
          <div className="flexbox" style={style}>
            {images.current.map((img, i) => (
              <div
                key={i}
                className="img"
                style={{ backgroundImage: `url(${img.src})` }}
              ></div>
            ))}
          </div>
        </div>
        <div
          className="btn"
          onClick={() => {
            moveSlide(1);
          }}
        >
          &gt;
        </div>
      </div>
      <div className="position">
        {images.current.map((x, i) => (
          <div key={i} className={i === current ? "dot current" : "dot"}></div>
        ))}
      </div>
    </div>
  );
};

export default BestMenu;
