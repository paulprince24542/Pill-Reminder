import React, { useEffect, useState } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSideBar";
import { DataTable } from "../components/DataTable";

import { Button } from "@/components/ui/button";

import { AppointmentModel } from "../components/AppointmentModel";
import { columns } from "../components/Columns";
import ProtectedRoute from "../components/ProtectedRoute";
import { fetchData } from "@/utils/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState([]);

  async function LoadBookings() {
    var data = await fetchData("/user/bookings/fetch");
    console.log(data);
  }

  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await getData();
    //   setData(result); // Update state with fetched data
    // };

    async function LoadBookings() {
      var bookingData = await fetchData("/user/doctor/bookings/fetch");
      console.log("Bookings", bookingData.bookings);
      setData(bookingData.bookings);
    }
    // fetchData();

    LoadBookings();
  }, []);
  return (
    <>
      <ProtectedRoute>
        <div className="flex">
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
              <SidebarTrigger />
              <div className="flex justify-between p-4">
                <h1 className="text-[30px]">View Appointments</h1>
                <AppointmentModel />
              </div>
              <DataTable columns={columns} data={data} />
            </div>
          </SidebarProvider>
        </div>
      </ProtectedRoute>
    </>
  );
}
