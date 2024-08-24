import MenuItem from "./MenuItem";

const MenuSection=({section,items})=>(
    <div >
        <h1 className='text-2xl pt-5'>{section}</h1>
        <div>
            {items.map((item,index)=>(
                <MenuItem key={index} name={item.name} price={item.price} />
            ))}
        </div>
    </div>
);

export default MenuSection;
