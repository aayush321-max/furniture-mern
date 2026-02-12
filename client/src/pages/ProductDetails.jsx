import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { useState } from "react";
import{ useNavigate } from "react-router-dom";
// last 3 card shi krne k liye 


import { useEffect } from "react";
import bed1 from "../assets/images/bed1.png";
import bed2 from "../assets/images/bed2.png";
import bed3 from "../assets/images/bed3.png";
import sofa1 from "../assets/images/sofa1.jpg";
import sofa2 from "../assets/images/sofa2.jpg";
import sofa3 from "../assets/images/sofa3.jpg";
import sofa4 from "../assets/images/sofa4.jpg";
import chair1 from "../assets/images/chair1.jpg";
import chair2 from "../assets/images/chair2.jpg";
import chair3 from "../assets/images/chair3.jpg";
import table1 from "../assets/images/table1.jpg";
import table2 from "../assets/images/table2.jpg";
import table3 from "../assets/images/table3.jpg";
import door1 from "../assets/images/door1.jpg";
import door2 from "../assets/images/door2.jpg";
import door3 from "../assets/images/door3.jpg";
import mirror1 from "../assets/images/mirror1.jpg";
import mirror2 from "../assets/images/mirror2.jpg";
import mirror3 from "../assets/images/mirror3.jpg";

const products = [
  { id: "1",
     name: "Luxury Bed",
      price: "₹45,000",
       images:[ bed1,bed2,bed3] ,

     desc: "Premium wooden bed with modern design This luxury bed is crafted to bring hotel-like comfort into your bedroom. The combination of premium upholstery, solid wooden structure, and modern headboard design makes it both visually appealing and extremely comfortable. Built for long-term use, it provides excellent back support and enhances the overall ambience of modern interiors.",

    points:[
    
      "Premium solid wood frame for long-lasting durability",
    "Soft cushioned headboard for superior comfort",
    "Hotel-style modern design for elegant bedrooms",
    "Strong base structure with excellent back support",
    "Smooth finish that blends with modern interiors"
  
    ]
    
    
    },





  { id: "2", name: "Modern Sofa", price: "₹38,000", images:[ sofa1,sofa2,sofa3,sofa4],
     desc: "Comfortable sofa for stylish living rooms This modern sofa is thoughtfully designed to elevate the comfort and style of contemporary living spaces. With its clean lines, soft cushioning, and premium fabric finish, it offers a perfect balance between elegance and everyday usability. The ergonomic seating structure provides excellent back and arm support, making it ideal for long sitting hours, family gatherings, or relaxed evenings. Its neutral tones and modern silhouette blend effortlessly with a wide range of interior themes, adding a refined and luxurious touch to your living room." ,
    
    
    points:[
      "Premium fabric upholstery with a soft and breathable texture",
"High-resilience foam cushions for superior seating comfort",
"Ergonomic armrest and backrest design",
"Sturdy internal wooden frame for long-term durability",
"Modern minimalist design suitable for stylish interiors"
    ]
    
    },


  { id: "3", name: "Wooden Chair", price: "₹12,000", images: [chair1,chair2,chair3], 
    desc: "Strong and elegant wooden chair This wooden chair is a perfect blend of traditional craftsmanship and modern comfort. Designed with a strong solid wood frame and smooth curved edges, it offers excellent stability while maintaining a warm, elegant appearance. The ergonomically shaped seat and backrest provide comfortable support, making it suitable for dining areas, study rooms, living spaces, or accent seating. Its natural wood finish adds a timeless charm, ensuring it complements both classic and contemporary interiors effortlessly.",
  
  
  points:[
    "Premium fabric upholstery with a soft and breathable texture",
"High-resilience foam cushions for superior seating comfort",
"Ergonomic armrest and backrest design",
"Sturdy internal wooden frame for long-term durability",
"Modern minimalist design suitable for stylish interiors"
  ]
  
  },




  { id: "4", name: "Dining Table", price: "₹28,000", images:[ table1,table2,table3,table3],
     desc: "Perfect dining table for family meals This dining table is thoughtfully designed to bring families together for everyday meals and special moments. Crafted with a strong wooden tabletop and a sturdy base, it offers excellent durability while maintaining a refined, modern look. The spacious surface provides ample room for serving meals comfortably, making it ideal for family dinners, gatherings, and celebrations. Its clean lines and rich wood finish enhance the warmth of your dining space, blending seamlessly with both contemporary and classic interiors." ,
    points:[

      "Spacious tabletop designed for comfortable family dining",
"Strong wooden construction for long-lasting durability",
"Smooth polished surface that is easy to clean and maintain",
"Stable base ensuring excellent balance and support",
"Perfect for daily use as well as special occasions"
    ]},




  { id: "5", name: "Designer Door", price: "₹22,000", images: [door1,door2,door3,],
     desc: "Designer wooden door with premium finish This designer door is crafted to make a strong first impression while ensuring safety and durability for your home. Built with high-quality wood and detailed craftsmanship, it combines elegance with structural strength. The refined finish and modern design enhance the overall appearance of your entrance, adding a luxurious touch to your interiors. Designed to withstand daily use, this door offers excellent resistance to wear while maintaining its premium look over time.",
    points:[

      "Premium quality wooden construction for enhanced strength",
"Elegant design that elevates the look of home entrances",
"Smooth finish with attention to fine detailing",
"Strong and durable build suitable for long-term use"]
},






{
  id: "6",
  name: "Dressing Mirror",
  price: "₹15,000",
  images: [mirror1, mirror2, mirror3],

  desc: "Stylish mirror for modern bedrooms. This elegant dressing mirror is designed to add both functionality and style to your living space. Crafted with a sleek frame and crystal-clear reflective glass, it enhances natural light and makes rooms appear more spacious. Perfect for daily grooming and outfit checks, it blends seamlessly with modern as well as classic interiors.",

  points: [
    "High-quality glass for clear and accurate reflection",
    "Stylish frame that complements modern interiors",
    "Enhances room brightness and visual space",
    "Strong and stable build for everyday use",
    "Ideal for bedrooms, dressing rooms, and wardrobes"
  ]
}

];

function ProductDetails() {


//use effect htana h gdbd hone pr bs 

useEffect(() => {
    window.scrollTo(0, 0);
  }, []);





  const { addToCart } = useContext(CartContext);
const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
const[imgIndex,setImgIndex]=useState(0);
  if (!product) return <h2 style={{ padding: "50px" }}>Product not found</h2>;

const nextImg = () => {
  setImgIndex((prev) =>
    prev === product.images.length - 1 ? 0 : prev + 1
  );
};

const prevImg = () => {
  setImgIndex((prev) =>
    prev === 0 ? product.images.length - 1 : prev - 1
  );
};





 









  return (
    <section className="details">
    

<div style={{ position: "relative", width: "420px" }}>
  
  <img
    src={product.images[imgIndex]}
    alt={product.name}
    style={{ width: "100%", borderRadius: "10px" }}
  />

  <button
    onClick={prevImg}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgba(0,0,0,0.5)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    ❮
  </button>

  <button
    onClick={nextImg}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgba(0,0,0,0.5)",
      color: "white",
      border: "none",
      borderRadius: "50%",
      padding: "10px",
      cursor: "pointer",
    }}
  >
    ❯
  </button>

</div>
      <div className="details-info">
        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
        <p>{product.desc}</p>
        {/* ✅ PRODUCT POINTS (SAFE) */}
{product.points && (
  <>
    <h4>Why You’ll Love It</h4>
    <ul className="product-points">
      {product.points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </>
)}



<button
  onClick={(e) => {
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    addToCart({ ...product, qty: 1 });

    // navigate("/cart"); // 👈 THIS LINE FIXES IT
  }}
>
  Add to Cart
</button>


      </div>
    </section>
  );
}

export default ProductDetails;