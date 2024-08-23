import data from '../../data.json'
// import RestaurantMenu from './Items/RestaurantMenu';
import Foods from './Foods/Foods';
import RestaurantList from './Items/RestaurantList';
// import { Route, Routes } from 'react-router-dom';

export default function Menu() {
    // console.log(data.restaurants);
    return (
        <>
            <div className="py-[30px] px-[120px] mt-[60px]">
                <Foods />
                <div>
                    <h1>
                        <RestaurantList restaurants={data.restaurants}/>
                    </h1>
                </div>
            </div>
        </>
    );
}
