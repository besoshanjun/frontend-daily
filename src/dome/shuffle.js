import React, { useState } from "react";
import {Flipper, Flipped} from "react-flip-toolkit";
import shuffle from 'lodash/shuffle';

// @WithComponent()
export default function Shuffle() {
  const [arr, setArr] = useState([...Array.from({length: 81}, (v,k) => k)]);
  return (
    <div>
      <Flipper className="shuffle-box" flipKey={arr.join('')}>
        {arr.map((item) => (
          <Flipped key={item} flipId={item}>
          <div className="item" key={item}>
            {item}
          </div>
          </Flipped>
        ))}
      </Flipper>
      <div className="button" onClick={() => setArr(shuffle(arr))}>洗牌</div>
    </div>
  );
}
