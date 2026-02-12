//icon k liye
import bedIcon from "../assets/categoryIcons/bed.png";
import sofaIcon from "../assets/categoryIcons/sofa.png";
import diningIcon from "../assets/categoryIcons/dining.png";
import coffeeIcon from "../assets/categoryIcons/coffee.png";
import wardrobeIcon from "../assets/categoryIcons/wardrobe.png";
import mirrorIcon from "../assets/categoryIcons/mirror.png";
import tvIcon from "../assets/categoryIcons/tv.png";
import bookshelfIcon from "../assets/categoryIcons/bookshelf.png";
import studyIcon from "../assets/categoryIcons/study.png";


function CategorySection({ onSelect }) {
 
const categories = [
  { label: "Beds", value: "beds", icon: bedIcon },
  { label: "Sofas", value: "sofas", icon: sofaIcon },
  { label: "Dining Tables", value: "diningtables", icon: diningIcon },
  { label: "Coffee Tables", value: "coffeetables", icon: coffeeIcon },
  { label: "Wardrobes", value: "wardrobes", icon: wardrobeIcon },
  { label: "Dressing Mirrors", value: "dressingmirrors", icon: mirrorIcon },
  { label: "TV Units", value: "tvunits", icon: tvIcon },
  { label: "Bookshelves", value: "bookshelves", icon: bookshelfIcon },
  { label: "Study Chairs", value: "studychairs", icon: studyIcon },
];





  return (
    <section style={{ marginTop: "80px" }}>
      <h2 style={{ marginBottom: "20px" }}>
        Browse by Category
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.value}
            
    // onClick={() => onSelect(cat.value)}
    
onClick={() => {
  console.log("CATEGORY CLICKED:", cat.value);
  onSelect(cat.value);
}}
            style={{
              minWidth: "140px",
              height: "140px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
        
<img
  src={cat.icon}
  alt={cat.label}
  style={{
    width: "70px",
    height: "70px",
    objectFit: "contain",
    borderRadius: "10px",
    marginBottom: "10px",
  }}
/>

            

            <span style={{ fontWeight: "500" }}>{cat.label}</span>

           
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
