import React from "react";
import style from "./Foods.module.css";

function Foods() {
  return (
    <>
      <div className={style.main}>
        <div className={style.title}>
          <h1>What's on your mind?</h1>
        </div>

        <div className={style.foodList}>
          <div className={style.items}>
            <img
              className={style.image}
              src="./images/foods/food1.avif"
              alt="food"
            />
            <p>Pizza</p>
          </div>

          <div className={style.items}>
            <img
              className={style.image}
              src="./images/foods/food2.avif"
              alt="food"
            />
            <p>Pizza</p>
          </div>

          <div className={style.items}>
            <img
              className={style.image}
              src="./images/foods/food3.avif"
              alt="food"
            />
            <p>Pizza</p>
          </div>

          <div className={style.items}>
            <img
              className={style.image}
              src="./images/foods/food4.avif"
              alt="food"
            />
            <p>Pizza</p>
          </div>

          <div className={style.items}>
            <img
              className={style.image}
              src="./images/foods/food5.avif"
              alt="food"
            />
            <p>Pizza</p>
          </div>

          <div className={style.items}>
            <img
              className={style.image}
              src="./images/foods/food6.avif"
              alt="food"
            />
            <p>Pizza</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Foods;
