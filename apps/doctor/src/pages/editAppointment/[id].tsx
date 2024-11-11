import React, { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSideBar";
import { Button } from "@/components/ui/button";
import { columns } from "../components/Columns";
import EditAppointment from "../components/EditAppointment";
import { fetchData } from "@/utils/utils";
import { useRouter } from "next/router";

export default function EditAppointmentPage() {
  const [prescription, setPrescription] = useState([]);
  const router = useRouter();
  const { id } = router.query; // Extract the 'id' from router.query

  console.log("Appointment ID:", id);

  async function fetchMedicines() {
    if (id) {
      try {
        const medicines = await fetchData(
          `/user/doctor/bookings/prescription/fetch/${id}`
        );
        console.log("Medicines:", medicines);
        setPrescription(medicines);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    }
  }

  useEffect(() => {
    fetchMedicines();
  }, [id]); // Fetch medicines when 'id' is available

  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <SidebarTrigger />
          <div className="flex justify-between p-4">
            <h1 className="text-[30px]">Add Prescription</h1>
          </div>
          <div className="p-[100px]">
            <EditAppointment data={prescription} booking_id={id} />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
