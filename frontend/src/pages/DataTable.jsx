import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import img1 from "../images/city.png";
import Loaderimage from "../images/loader.gif";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL_BASE } from "../utils/apiURL";
import { getData } from "../Api/DataAPI";

const DataTable = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem("isUser");

    if (User === null) {
      navigate("/");
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const filterhoadata = (e) => {
    setSearch(e.target.value);
    paginate(1);
  };

  const handleSelectChangerow = (e) => {
    setPostsPerPage(e.target.value);
  };

  const [Loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getanalytics = () => {
      setLoader(true);
      getData().then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoader(false);
        } else {
          toast("Data Fetching Failed!");
        }
      });
    };

    getanalytics();
  }, []);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="relative sm:rounded-lg p-3" id="movetop">
            <>
              <div className="flex flex-wrap items-center justify-between py-4 px-4 bg-white dark:bg-gray-800 rounded-tl-lg rounded-tr-lg">
                <div className="relative p-2"></div>

                <div className="relative p-2 box-border">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-blue-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search-users"
                    className="block p-2 pl-10 text-sm text-blue-500 border border-blue-300 placeholder-blue-400 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 box-border"
                    placeholder="Search"
                    value={search}
                    onChange={filterhoadata}
                  />
                </div>
              </div>

              {Loader ? (
                <div className="w-full h-full">
                  <div className="flex justify-center p-30 pb-10 bg-white dark:bg-gray-800">
                    <img src={Loaderimage} alt="loader" className="w-20 h-20" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Topic
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Sector
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Region
                          </th>
                          <th scope="col" className="px-6 py-3">
                            PEST
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Source
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Country
                          </th>
                          <th scope="col" className="px-6 py-3">
                            End Year
                          </th>
                          <th scope="col" className="px-6 py-3">
                            View
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {data && data.length > 0
                          ? data
                              .filter((item) => {
                                const lowercasedSearch = search.toLowerCase();
                                return (
                                  lowercasedSearch === "" ||
                                  item.topic
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.country
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.sector
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.title
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.insight
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.source
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.published
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.added
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.pestle
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.region
                                    ?.toLowerCase()
                                    .includes(lowercasedSearch) ||
                                  item.relevance
                                    ?.toString()
                                    .includes(lowercasedSearch) ||
                                  item.likelihood
                                    ?.toString()
                                    .includes(lowercasedSearch) ||
                                  (item.end_year
                                    ? item.end_year
                                        .toString()
                                        .includes(lowercasedSearch)
                                    : false)
                                );
                              })
                              .slice(indexOfFirstPost, indexOfLastPost)
                              .map((item, index) => (
                                <tr
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                  key={index}
                                >
                                  <td className="px-6 py-4 uppercase">
                                    {item.topic ? item.topic : "-"}
                                    <br />
                                    <p className="text-xs text-gray-400">
                                      {item.title ? (
                                        <>
                                          {item.title?.substring(0, 20)}.....{" "}
                                        </>
                                      ) : (
                                        "-"
                                      )}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4">
                                    {item.sector ? item.sector : "-"}
                                  </td>
                                  <td className="px-6 py-4">
                                    {item.region ? item.region : "-"}
                                  </td>
                                  <td className="px-6 py-4">
                                    {item.pestle ? item.pestle : "-"}
                                  </td>
                                  <td className="px-6 py-4">
                                    {item.source ? item.source : "-"}
                                  </td>
                                  <td className="px-6 py-4">
                                    {item.country ? item.country : "-"}
                                  </td>
                                  <td className="px-6 py-4">
                                    {item.end_year ? item.end_year : "-"}
                                  </td>
                                  <td className="px-6 py-4">
                                    <a
                                      href={item.url}
                                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                                      target="_blank"
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                              ))
                          : null}
                      </tbody>
                    </table>
                  </div>

                  {data && data.length > 0 ? null : (
                    <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-center">
                      <h1 className="p-3">No Society Found</h1>
                    </div>
                  )}

                  <div
                    className="flex justify-end p-2 bg-white dark:bg-gray-800 rounded-bl-lg rounded-br-lg"
                    id="flextorow"
                  >
                    <a
                      className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      id="toogle"
                    >
                      Rows per page
                    </a>

                    <div className="flex items-center justify-center  leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      <select
                        name="rowsperpage"
                        id="rowsperpage"
                        className="pt-1 pb-1 pl-3 pr-7 border border-gray-300 rounded"
                        value={postsPerPage}
                        onChange={handleSelectChangerow}
                      >
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                      </select>
                    </div>

                    {data.length > 0 ? (
                      <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {currentPage} of {Math.ceil(data.length / postsPerPage)}
                      </a>
                    ) : (
                      <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        0 of 0
                      </a>
                    )}

                    <nav aria-label="Page navigation example">
                      <ul className="inline-flex -space-x-px text-sm">
                        <li>
                          {data.length > 0 ? (
                            <>
                              {currentPage === 1 ? (
                                <a
                                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                                  onClick={() =>
                                    paginate(
                                      Math.ceil(data.length / postsPerPage)
                                    )
                                  }
                                >
                                  Previous
                                </a>
                              ) : (
                                <a
                                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                                  onClick={() => paginate(currentPage - 1)}
                                >
                                  Previous
                                </a>
                              )}
                            </>
                          ) : (
                            <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                              Previous
                            </a>
                          )}
                        </li>

                        <li>
                          {data.length > 0 ? (
                            <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">
                              {currentPage}
                            </a>
                          ) : (
                            <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">
                              0
                            </a>
                          )}
                        </li>

                        <li>
                          {data.length > 0 ? (
                            <>
                              {currentPage ===
                              Math.ceil(data.length / postsPerPage) ? (
                                <a
                                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                                  onClick={() => paginate(1)}
                                >
                                  Next
                                </a>
                              ) : (
                                <a
                                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                                  onClick={() => paginate(currentPage + 1)}
                                >
                                  {" "}
                                  Next
                                </a>
                              )}
                            </>
                          ) : (
                            <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                              {" "}
                              Next
                            </a>
                          )}
                        </li>
                      </ul>
                    </nav>
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
