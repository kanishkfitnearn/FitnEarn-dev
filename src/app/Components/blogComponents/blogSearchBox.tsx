"use client";
import { useState, useEffect } from "react";

const BlogSearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 0) {
        setIsLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?title_like=${query}`,
        );
        const data = await response.json();
        //console.log(data);
        setResults(data);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
    <>
      <div>
        <input
          type="search"
          id="location-search"
          required
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Mockups, Logos, Design Themes..."
          className="block w-full h-[50px] py-[2px] px-[2.5px] z-20 text-[16px] font-medium leading-[24px] pl-4 text-[#A3A3A3] bg-[#171717] rounded-e-[10px] border-s-[#525252] border-s-2 border border-[#525252] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          style={{ borderRadius: "10px 10px 10px 10px" }}
        />
        {isLoading && <p>Loading...</p>}
        <ul className="bg-white">
          {results.map((result: any) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlogSearchBox;
