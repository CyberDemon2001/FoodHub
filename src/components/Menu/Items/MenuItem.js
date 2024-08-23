const MenuItem=({name,price})=>(
    <div className='h-[200px] w-[300px] mb-1 bg-blue-500 flex flex-col gap-[20px] items-center justify-center'>
        <div className="h-20 w-20 bg-green-500 text-center">Image</div>
        <p className='text-red-500 text-center'>{name} - ₹{price}</p>
    </div>
);

export default MenuItem;