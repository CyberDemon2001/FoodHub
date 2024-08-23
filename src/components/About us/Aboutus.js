export default function Aboutus(){
  return(
    <>
    <h1 className="mt-[70px] pt-[50px] text-center text-3xl text-[#FE5005]">Members</h1>
    <div className="h-[calc(100vh-160px)] flex">
      <div className="h-[100%] w-[50%] flex flex-col items-center justify-center">
        <img className="h-[60%]" src="raman.png" alt="raman" />
        <h1 className="text-2xl text-[#FE5005] mt-2">Raman Chauhan</h1>
        <h1 className="text-xl text-gray-600 font-medium">Developer</h1>
      </div>
      <div className="h-[100%] w-[50%] flex flex-col items-center justify-center">
        <img className="h-[60%]" src="vaibhav.jpg" alt="vaibhav" />
        <h1 className="text-2xl text-[#FE5005] mt-2">Vaibhav Tyagi</h1>
        <h1 className="text-xl text-gray-600 font-medium">Developer</h1>
      </div>
    </div>
    </>
  )
}