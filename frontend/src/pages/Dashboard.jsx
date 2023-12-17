import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loaderimage from "../images/loader.gif";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import DashboardCard1 from "../partials/dashboard/DashboardCard1";
import DashboardCard2 from "../partials/dashboard/DashboardCard2";
import DashboardCard3 from "../partials/dashboard/DashboardCard3";
import DashboardCard4 from "../partials/dashboard/DashboardCard4";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";

import Footer from "../partials/Footer";
import { getData } from "../Api/DataAPI";
import { toast } from "react-toastify";

function Dashboard() {
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const User = localStorage.getItem("isUser");
    
    if (User === null) {
      navigate("/");
    }
  }, []);
  
  const [loader, setLoader] = useState(false);
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {loader? (
            <div className="flex justify-center items-center w-full h-full overflow-hidden">
              <img src={Loaderimage} alt="loader" className="w-20 h-20" />
            </div>
          ) : (
            <>
              <main>
                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                  <div className="grid grid-cols-12 gap-6">
                    <DashboardCard1 data1={data} />
                    <DashboardCard2 data1={data} />
                    <DashboardCard3 data1={data} />
                    <DashboardCard4 data1={data} />
                    <DashboardCard04 data1={data} />
                    <DashboardCard06 data1={data} />
                    <DashboardCard07 data1={data} />
                  </div>
                </div>
              </main>

              <Footer />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
