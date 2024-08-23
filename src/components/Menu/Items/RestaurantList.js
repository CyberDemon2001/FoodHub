import Restaurant from "./Restaurant";

const RestaurantList=({restaurants})=>{
    return(<>
        <h1>Restaurant Menu</h1>
    <div className='text-orange-500 grid grid-cols-2'>
        {restaurants.map((restaurant,index)=>(
            <Restaurant key={index} restaurantName={restaurant.restaurantName} />
        ))}
    </div>
    </>
);
}

export default RestaurantList;