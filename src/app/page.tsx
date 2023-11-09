import CategoriesList from "@/components/CategoriesList/CategoriesList";
import CategoriesForm from "@/components/CategoriesForm/CategoriesForm";
import "./styles.css";

export default async function Home() {
  return (
    <main>
      <div className="container">
        <div className="categoriesContainer">
          <CategoriesForm />
          <CategoriesList />
        </div>
      </div>
    </main>
  );
}
