import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products , Currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size , setSize] = useState('');

  const fetchProductData = async () => {
    const found = products.find(item => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData(); 
  }, [productId,products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/** Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/** -------- Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-2 sm:flex-row'>
          <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/**----- Product Info ----------- */}
        <div className='flex-1 '>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
          <img className='w-3 5' src={assets.star_icon} alt="" />
          <img className='w-3 5' src={assets.star_icon} alt="" /> 
          <img className='w-3 5' src={assets.star_icon} alt="" />
          <img className='w-3 5' src={assets.star_icon} alt="" />
          <img className='w-3 5' src={assets.star_dull_icon} alt="" />
          <p className='pl-2'>(122)</p>
        </div> 
        <p className='mt-5 text-3xl font-medium'>{Currency}{productData.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2'>
            {productData.sizes.map((item,index)=>(
              <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}key={index}>{item}</button>
            ))}
          </div>
        </div>
        <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 '>ADD TO CART</button>
        <hr className='mt-8 sm:w-4/5'/>
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% Original Product</p>
          <p>Cash On delivery is available on this product.</p>
          <p>Easy return and exchange policy within 7 days.</p>
        </div>
        </div>
        
      </div>

      {/**Review and description section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet cumque ducimus eum tenetur porro maiores suscipit debitis beatae illo. Consequuntur atque iste odio! Fuga quas incidunt nulla quaerat doloribus ea!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos et commodi cupiditate velit iusto, praesentium voluptatem? Aspernatur nisi, pariatur numquam similique a nostrum laudantium voluptates dolores quis autem velit praesentium!</p>
        </div>
      </div>
      {/**Displaying related Products */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
