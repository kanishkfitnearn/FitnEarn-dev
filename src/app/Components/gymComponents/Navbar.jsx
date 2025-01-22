import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800  py-4 px-6 flex items-center justify-between border-b">
      <div className="flex items-center space-x-2 ">
        <div className="text-red-500 font-bold text-2xl">FitnEarn</div>
      </div>
      <div className="flex items-center space-x-6 text-white">
        <Link to={"/"} className="">
          Home
        </Link>
        <a href="#" className="">
          Workout
        </a>
        <a href="#" className="">
          Blogs
        </a>
        <a href="#" className="">
          Coach
        </a>
        <a href="#" className="">
          Calculator
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
