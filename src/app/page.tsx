import { FaPlus } from "react-icons/fa6";
import CategoriesList from "@/components/CategoriesList/CategoriesList";
import "./styles.css";

export default async function Home() {
  return (
    <main>
      <div className="container">
        <div className="categoriesContainer">
          <button className="categoriesBtn">
            <FaPlus size={14} />
            <span className="categoriesBtnText">Create a Category</span>
          </button>
          <CategoriesList />
        </div>
      </div>
    </main>
  );
}
