'use client';

import {BiSearch} from 'react-icons/bi'
const Search = () =>{
  return (
    <div className=' border-[1px] w-full md:w-auto rounded-full py-2 shadow-sm hover:shadow-md transition cursor-pointer'>
      <div className='flex items-center  justify-between'>
        <div className='text-sm font-semibold px-6'>Anywhere</div>
        <div className='hidden sm:block text-sm font-semibold px-6  border-x-[1px] '>Any Weeke</div>
        <div className=' px-6 flex flex-row items-center gap-3'>
          <div className='hidden sm:block text-sm font-semibold text-gray-500 '>Add Guests</div>
          <div className='hidden sm:block p-2 bg-rose-500  rounded-full  text-white'>
            <BiSearch size={18}/>
          </div>
        </div>

      </div>
    </div>
  )
} 
export default Search