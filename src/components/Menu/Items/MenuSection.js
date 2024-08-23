import MenuItem from "./MenuItem";

const MenuSection=({section,items})=>(
    <div>
        <h3 className='text-green-500 text-3xl mb-5 mt-5'>{section}<hr /></h3>
        <div className='grid grid-cols-4 gap-[5px] '>
            {items.map((item,index)=>(
                <MenuItem key={index} name={item.name} price={item.price} />
            ))}
        </div>
    </div>
);

export default MenuSection;
