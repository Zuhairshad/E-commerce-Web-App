import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const Currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token,setToken] = useState("")
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    if (token){
      try{
await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) return;

    if (quantity === 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
    if (token){
      try{
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size,quantity }, { headers: { token } });
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          totalCount += cartItems[productId][size];
        }
      }
    }

    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          totalAmount += product.price * cartItems[productId][size];
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  /**  Whenever user refreshes it would prevent updating cartitems  */
const getUserCart = async (token) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/cart/get`,
      {}, // empty body
      { headers: { token } } // headers go here
    );

    if (response.data.success) {
      setCartItems(response.data.cartData);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(()=>{
    if (token){
      navigate('/')
    }
  },[token])

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'))
    }
  },[])
  const value = {
    products,
    Currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    token,setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
