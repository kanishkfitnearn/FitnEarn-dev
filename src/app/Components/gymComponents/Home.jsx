import { useContext, useEffect } from "react";
import GymCard from "./GymCard";
import SearchBar from "./SearchBar";
import { GET_PLACES } from "../utils/API";
// import { fetchData } from "../utils/fetchData";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { state, fetchData } = useContext(AppContext);
  useEffect(() => {
    fetchData(GET_PLACES, {
      latitude: 28.5355,
      longitude: 77.391,
      radius: 10000,
      keyword: "gym,yoga",
    });
  }, []);
  console.log(state);

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Workout & Live Sessions</h1>
          <p className="text-gray-600 text-lg">
            Curated by a team of fitness coaches for everybody, every mood,
            every goal
          </p>
        </div>
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {state?.loading ? (
            <div className="text-center text-white text-2xl font-semibold">
              Loading...
            </div>
          ) : (
            state?.data.map((gym) => <GymCard key={gym.placeId} gym={gym} />)
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
