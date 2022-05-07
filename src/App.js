import axios from "axios";
import { useEffect, useState } from "react";
import FilterButton from "./components/Button";
import FilterModal from "./components/FilterModal";
import RestoCard from "./components/RestoCard";

function filterSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );
}

function ratingSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
      />
    </svg>
  );
}

function costSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      />
    </svg>
  );
}

export default function App() {
  const [restoList, setRestoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterSort, setFilterSort] = useState({
    rating: false,
    cost: false,
  });
  const temp = [...restoList].sort(function (x, y) {
    return x.promoted && x.open === true
      ? -1
      : y.promoted && y.open === true
      ? 1
      : 0;
  });
  const cuisinesList = [
    "North Indian",
    "European",
    "Chinese",
    "South Indian",
    "Italian",
    "Desserts",
    "Drinks",
    "Japanese",
    "Goan",
  ];
  const [filterByCuisine, setFilterByCuisine] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://crio-ui-challenge.herokuapp.com/restaurants")
      .then((res) => {
        setRestoList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  function filtercondition(resto1, resto2) {
    if (filterSort.rating) {
      return resto2.rating - resto1.rating;
    } else if (filterSort.cost) {
      return resto1.costForTwo - resto2.costForTwo;
    }
    return 0;
  }

  const restaurantsList =
    filterSort.rating || filterSort.cost
      ? temp.sort((a, b) => filtercondition(a, b))
      : restoList.sort(function (x, y) {
          return x.promoted && x.open === true
            ? -1
            : y.promoted && y.open === true
            ? 1
            : 0;
        });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <svg
            role="status"
            className="inline w-10 h-10 mr-2 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <FilterButton
                svg={filterSvg()}
                text="Filter By Cuisine"
                onClick={() => setShowModal(true)}
                active={filterByCuisine.length > 0}
              />
              <FilterButton
                svg={ratingSvg()}
                text="Rating"
                onClick={() => {
                  setFilterSort((prevState) => ({
                    cost: false,
                    rating: !prevState.rating,
                  }));
                }}
                active={filterSort.rating}
              />
              <FilterButton
                svg={costSvg()}
                text="Cost"
                onClick={() =>
                  setFilterSort((prevState) => ({
                    rating: false,
                    cost: !prevState.cost,
                  }))
                }
                active={filterSort.cost}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-6">
              {restaurantsList
                .filter((resto) => {
                  if (filterByCuisine.length === 0) {
                    return true;
                  }
                  return filterByCuisine.some(
                    (r) => resto.cuisine.indexOf(r) >= 0
                  );
                })
                .map((resto) => (
                  <RestoCard data={resto} key={resto.id} />
                ))}
            </div>
            <FilterModal
              show={showModal}
              handleModal={setShowModal}
              cuisinesList={cuisinesList}
              setFilterByCuisine={setFilterByCuisine}
            />
          </div>
        </>
      )}
      ;
    </>
  );
}
