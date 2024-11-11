"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ViewPill } from "./ViewPill";
import { PostRequestHandler } from "@/utils/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the schema for the form with dynamic fields
const formSchema = z.object({
  prescriptions: z.array(
    z.object({
      medicine_name: z.string().min(1, { message: "Medicine is required" }),
      quantity: z
        .string() // Start by accepting a string
        .refine((val) => !isNaN(Number(val)), {
          message: "Quantity must be a number",
        }) // Ensure it's a valid number
        .transform((val) => Number(val)),
      duration: z.string().min(1, { message: "Duration is required" }), // Keep duration as a string
    })
  ),
});

// Define the type for a single prescription item
interface MedicineData {
  medicine_name: string;
  quantity: number; // Ensure quantity is a number
  duration: string; // Keep duration as a string
}

export default function EditAppointment({ data, booking_id }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Initialize form with 3 empty fields
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prescriptions: [{ medicine_name: "", quantity: 0, duration: "" }],
    },
  });

  const { control, handleSubmit, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prescriptions", // this refers to the 'prescriptions' array in formState
  });

  const onSubmit = async (data: any) => {
    console.log("Submitted data:", data); // Handle your form submission
    console.log("Submitted booking_id:", booking_id); // Handle your form submission

    // Ensure quantity is a number if it somehow becomes a string during form processing
    const prescriptionData = {
      booking_id: booking_id,
      prescriptions: data.prescriptions.map((prescription: any) => ({
        ...prescription,
        quantity: Number(prescription.quantity), // Explicitly convert to number
      })),
    };

    console.log(prescriptionData);

    const prescriptionAdded = await PostRequestHandler(
      "/user/doctor/bookings/prescription/add",
      prescriptionData
    );

    if (prescriptionAdded) {
      setIsDialogOpen(true); // Open the dialog
      reset();
    }
  };

  return (
    <>
      <div>
        <h1>Medicines Prescribed</h1>
        <ViewPill prescription={data} />
      </div>
      {/* Use the full form state */}
      <Form {...form}>
        <form className="space-y-8 w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* Dynamically render fields */}
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex space-x-4">
                  <FormField
                    control={control}
                    name={`prescriptions.${index}.medicine_name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medicine</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Medicine"
                            {...field}
                            className="w-[400px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`prescriptions.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quantity"
                            type="number" // Ensuring this is a number input
                            {...field}
                            className="w-[400px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Place the Duration field on a new line */}
                <div className="flex space-x-4 items-center mt-5">
                  <FormField
                    control={control}
                    name={`prescriptions.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Duration"
                            type="text" // Duration remains a string
                            {...field}
                            className="w-[400px]"
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          className=""
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)} // Removes the prescription item
                        >
                          Remove
                        </Button>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>No prescriptions available</div>
          )}

          <div className="flex justify-between">
            <Button type="submit">Submit</Button>

            <Button
              type="button"
              className=""
              onClick={() =>
                append({ medicine_name: "", quantity: 0, duration: "" })
              }
            >
              Add New Medicine
            </Button>
          </div>
        </form>
      </Form>
      {/* ! Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Your prescription has been successfully added.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
