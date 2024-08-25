import React from 'react'

function Cart() {
  return (
    <div className="mt-[70px] h-[calc(100vh-70px)]">
      <div className='flex gap-2 text-3xl justify-center pt-5'>
        <h1>Your</h1>
        <h1 className='text-[#FE5005]'>Cart</h1>
      </div>

      <div className='flex justify-center pt-5'>
      <table className='border border-solid border-black w-[70%]'>
        <tr className='border border-solid border-black text-2xl'>
          <th  ></th>
          <th className='py-2'  colspan="3">Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
        <tr>
          <td className='text-center'>Image</td>
          <td className='text-center text-[#FE5005]' colspan="3">Corn Pizza</td>
          <td className='text-center'>₹150</td>
          <td className='h-14 flex justify-center items-center'>
            <div className='bg-[#FE5005] flex justify-center w-12 text-white'><button>-</button><div className='w-4 text-center'>1</div><button>+</button>
            </div>
          </td>
          <td className='text-center'>₹150</td>
          <td className='text-center'><button className='bg-[#ff0000] text-white px-2 m-1'>X</button></td>
          
        </tr>

      </table>
      </div>
    </div>
  )
}

export default Cart
