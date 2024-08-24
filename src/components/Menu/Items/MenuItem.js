const MenuItem=({name,price})=>{
    const dot = '.'.repeat(120)
    return (
    <div className="flex justify-between px-14">

    <p className="text-[#FE5005]">{name}</p>
    <p>{dot}</p>
    <p>₹{price}\-</p>
    </div>
)};

export default MenuItem;