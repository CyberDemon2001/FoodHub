const MenuItem=({name,price})=>{
    const dot = '.'.repeat(120)
    return (
    <div className="flex justify-between px-14 my-2">

    <p className="text-[#FE5005]">{name}</p>
    <p>{dot}</p>
    <p>₹{price}\-</p>
    <button className="bg-orange-500 p-1 hover:shadow-lg hover:shadow-black">Add to Cart</button>
    </div>
)};

export default MenuItem;