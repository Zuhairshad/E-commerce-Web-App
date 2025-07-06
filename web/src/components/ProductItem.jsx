import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ Id, image, name, price }) => {
  const { Currency } = useContext(ShopContext)

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${Id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{Currency}{price}</p>
    </Link>
  )
}

export default ProductItem
