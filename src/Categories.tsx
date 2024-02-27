// Categories.tsx
import "./Categories.css"; // Import the CSS file

const Categories = () => {
  const categories = ["Category 1", "Category 2", "Category 3"]; // Replace with your actual categories

  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
