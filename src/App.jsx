import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("all");
  const [range, setRange] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setData(response.data.products);
        setFilteredData(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterData = () => {
    let filtered = data;

    if (inputData) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(inputData.toLowerCase())
      );
    }

    if (price) {
      filtered = filtered.filter((item) => item.price <= price);
    }

    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    filtered = filtered.filter((item) => item.price <= range);

    setFilteredData(filtered);

    if (filtered.length === 0) {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    filterData();
  }, [inputData, price, category, range, data]);

  return (
    <div className="bg-zinc-900 h-screen flex flex-col items-center w-full">
      <div className="h-96 flex flex-wrap items-center justify-evenly w-full text-white">
        <div className="flex gap-2">
          <input
            type="range"
            name="range"
            max={1000}
            min={10}
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="appearance-none h-2 bg-gray-700 rounded-lg"
          />
          <p className="text-zinc-400">Range: {range}</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            name="list"
            className="px-3 py-2 rounded-xl bg-zinc-800 outline-none"
            placeholder="Search Product..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            name="price"
            className="px-3 py-2 rounded-xl bg-zinc-800 outline-none"
            placeholder="Enter Price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="px-3 py-2 rounded-xl bg-zinc-800 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
          >
            <option value="all">All</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="groceries">Groceries</option>
            <option value="furniture">furniture</option>
          </select>
        </div>
      </div>

      <div className="overflow-auto w-11/12 rounded-xl mb-5 no-scrollbar">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
            </tr>
          </thead>
          {filteredData && (
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">{item.stock}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default App;
