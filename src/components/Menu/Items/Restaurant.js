import { Link } from "react-router-dom";

const Restaurant=({restaurantName})=>(
    <div className=' h-[200px] w-[400px] bg-red-100 m-6 text-5xl'>
        <h2 className='text-yellow-500'><Link to={`/menu/restaurants/${restaurantName}`}>{restaurantName}</Link></h2>
    </div>
);

export default Restaurant;