import { Link } from "react-router-dom";

const Restaurant=({restaurantName})=>(
    <Link to={`/menu/restaurants/${restaurantName}`}>
    <div className="h-[200px] flex flex-col justify-center items-center">
        <div className="h-[70%] w-[70%] border-2 border-solid">
        <img src="bjj" alt={restaurantName}/>
        </div>
        <h2 className="text-xl text-black">{restaurantName}</h2>
    </div>
    </Link>
);

export default Restaurant;