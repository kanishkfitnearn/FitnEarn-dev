import React from "react";

const GymDetail = ({ gym, sessions }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{gym.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">⚡</span>
              <span className="font-semibold">{gym.rating}</span>
              <span className="text-gray-500">({gym.reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              {/* <MapPin className="w-4 h-4" /> */}
              <span>{gym.location}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full border hover:bg-gray-50">
            {/* <Heart className="w-5 h-5" /> */}
          </button>
          <button className="p-2 rounded-full border hover:bg-gray-50">
            {/* <Share className="w-5 h-5" /> */}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-2">
          <img
            src={gym.images[0]}
            alt={gym.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {gym.images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${gym.name} ${index + 1}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Book your session</h2>
          {sessions.map((session) => (
            <div key={session.id} className="border-b last:border-b-0 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{session.type}</h3>
                  <div className="text-sm text-gray-600">
                    {session.date} • {session.startTime} - {session.endTime}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 line-through">
                      ₹{session.price}
                    </span>
                    <span className="font-semibold">
                      ₹{session.discountedPrice}
                    </span>
                  </div>
                  <span className="text-green-500 text-sm">
                    Get ({session.discountPercentage}% OFF)
                  </span>
                </div>
              </div>
              <button className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymDetail;
