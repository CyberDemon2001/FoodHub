import React from 'react'
import {useNavigate} from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <>
    <div className='h-[20vh] bg-amber-500'>
      <h1>This is Footer</h1>
      <button onClick={()=>navigate('/ourteam')}>Our Team</button>
    </div>
    </>
  )
}

export default Footer
