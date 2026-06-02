import { useState ,useEffect} from "react";
import Navbar from "./components/Navbar"
import "./App.css";

export default function Groceries() {

  const [groceries, setGroceries] = useState([]); 
  const [itemvisible, setitemvisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [CartVisible, setCartVisible] = useState(false);
  const [Cart, setCart] = useState([]);

  useEffect(() => {
  fetch("https://dummyjson.com/products?limit=190&select=id,rating,title,description,price,thumbnail")
    .then(res => res.json())
    .then(data => {
      setGroceries(data.products); // <-- NEW DATA SOURCE
    })
    .catch(err => console.log(err));
}, []);


  function handleClick() {
    setitemvisible(prev => !prev)
  }
  function handleDetails(product) {
    setSelectedDetail(product);
  }
  function closeDetails() {
    setSelectedDetail(null);
  }
  function closeCart() {
    setCartVisible(false);
  }
  function clearCart() {
    setCart([])  
  }

  return (

    <>
      <Navbar />

      <button onClick={handleClick} className="btn">{!itemvisible ? <p>I am very Busy!</p> : <p>I am free now!</p>}</button>
      <button onClick={() => setCartVisible(true)} className="btn4">Cart ({Cart.length})</button>
      {!itemvisible &&
        <div className="container">
          {groceries.map((product) => (
            <div key={product.id} className="item">
              <img src={product.thumbnail} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Price: <strong>${product.price}</strong></p>
              <p>Rating: <strong>{product.rating}</strong></p>
              <button className="btn1" onClick={() => { setCart([...Cart, product]) }}>Add to Cart</button>
              <button className="btn2" onClick={() => handleDetails(product)}>View Details</button>
        </div>
          ))}

      {selectedDetail &&
         <div className="details">
            <div key={selectedDetail.id} className="item1">
              <img src={selectedDetail.thumbnail} alt={selectedDetail.title} />
              <h2>{selectedDetail.title}</h2>
              <p>Price: <strong>${selectedDetail.price}</strong></p>
              <p>Rating: <strong>{selectedDetail.rating}</strong></p>
              <p>Description: {selectedDetail.description}</p>
              <button className="btn2" onClick={closeDetails}>Close</button>
            </div>
          </div>
        }
        </div>
      }

      {CartVisible &&
        <div onClick={() => setCartVisible(false)} className="cartitems">
          <button onClick={closeCart} className="closebtn">Close</button>
          <button onClick={() => setCart([])} className="closebtn">Clear Cart</button>
          <div onClick={(e) => e.stopPropagation()}>
            {Cart.length === 0 ?
              (
                <div className="empty-cart">
                  <h2>Your cart is empty</h2>
                </div>
              ) : (
                Cart.map((cartitem) =>
                  <div key={cartitem.id} className="cart-item">
                    <img src={cartitem.thumbnail} alt={cartitem.title} />
                    <h2>{cartitem.title}</h2>
                    <p>Price: <strong>${cartitem.price}</strong></p>
                    <p>Rating: <strong>{cartitem.rating}</strong></p>
                  </div>
                ))
            }
          </div>
        </div>
      }
    </>
  )
}

