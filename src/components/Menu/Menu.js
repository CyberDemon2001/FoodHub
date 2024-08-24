import data from '../../data.json'
// import RestaurantMenu from './Items/RestaurantMenu';
import Foods from './Foods/Foods';
import RestaurantList from './Items/RestaurantList';
// import { Route, Routes } from 'react-router-dom';

export default function Menu() {
    // console.log(data.restaurants);
    return (
        <>
            <div className="py-[30px] px-[120px]">
                <Foods />
                <div className="border-2 border-solid grid">
                    <RestaurantList restaurants={data.restaurants}/>
                </div>
            </div>
        </>
    );
}
