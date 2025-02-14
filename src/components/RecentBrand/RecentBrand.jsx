import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RecentBrand() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => {
        setBrands(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto md:p-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-600">ِAll Brands</h2>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:border-green-500 hover:shadow-green-500 cursor-pointer border border-gray-400"
              onClick={() => setSelectedBrand(brand)}
            >
              <img src={brand.image} alt={brand.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-sm font-extralight text-gray-500 text-center mt-3">{brand.name}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start  justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[480px] relative mt-7">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
              onClick={() => setSelectedBrand(null)}
            >
              &times;
            </button>
            <div className="flex justify-between items-center border-b border-t pb-4">
                <div>
                <h2 className="text-2xl font-bold text-green-600">{selectedBrand.name}</h2>
                <p className="text-gray-600 mt-4 text-left">{selectedBrand.name.toLowerCase()}</p>
                </div>
              <img src={selectedBrand.image} alt={selectedBrand.name} className="h-40 object-contain" />
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setSelectedBrand(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
