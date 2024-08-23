import { useParams } from "react-router-dom";
import MenuSection from "./MenuSection";
import data from '../../../data.json';

const RestaurantMenu=({restaurants})=>{

    const {restaurantName}=useParams();
    // console.log(restaurantName);
    // console.log(restaurants);
    const restaurant=data.restaurants.find(r=>r.restaurantName===restaurantName);
    // console.log("Restaurant Data:", restaurant);
    if (!restaurant) {
        return <div>Restaurant not found</div>;
      }
    // console.log("Restaurant Name from URL:", restaurantName);
    return(
        <div className="mt-[70px] flex justify-center">
        <div>
            <h2 className='text-blue-500 text-5xl'>{restaurant.restaurantName}<hr /></h2>
            <div>
                {restaurant.menu.map((section,index)=>(
                    <MenuSection key={index} section={section.section} items={section.items} />
                ))}
            
            </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;