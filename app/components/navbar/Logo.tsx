'use client';

import Image from 'next/image'

const Logo = () => (
  <div className="grid-element">
    <Image
        className='hidden md:block cursor-pointer'
        src="/images/logo.png" 
        height="100" 
        width="100" 
        alt="Logo" 
    />
  </div>
)

export default Logo