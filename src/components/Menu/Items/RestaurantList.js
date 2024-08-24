import Restaurant from "./Restaurant";

const RestaurantList = ({ restaurants }) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {restaurants.map((restaurant, index) => (
          <Restaurant key={index} restaurantName={restaurant.restaurantName} />
        ))}
      </div>
    </>
  );
};

export default RestaurantList;
