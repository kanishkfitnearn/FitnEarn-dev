import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const GymCard2 = ({ gym }) => {
  const defaultImage =
    "https://static.vecteezy.com/system/resources/thumbnails/046/836/920/small/bangladeshi-male-fitness-trainer-in-modern-gym-setting-promoting-health-and-exercise-photo.jpg";
  return (
    <div className="relative bg-slate-800 rounded-lg overflow-hidden shadow-md text-white">
      <img
        src={gym.image !== "No image available" ? gym.image : defaultImage}
        alt={gym.name}
        className="w-full h-48 object-cover"
      />

      <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white"></button>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{gym.name}</h3>
            <div className="flex items-center space-x-1 text-sm text-white">
              <span>{gym.address}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">⚡</span>
            <span className="font-semibold">{gym?.rating}</span>
            <span>({gym?.reviewCount})</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm">Opens at {gym?.isOpen}</div>
          <Link
            to={`/gym/${gym.placeId}`}
            state={gym}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};
GymCard2.propTypes = {
  gym: PropTypes.shape({
    placeId: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    rating: PropTypes.string | PropTypes.number,
    reviewCount: PropTypes.number,
    isOpen: PropTypes.string,
  }).isRequired,
};

export default GymCard2;
