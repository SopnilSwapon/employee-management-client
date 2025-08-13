import React from "react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import AddEmployee from "./AddEmployee";

export interface IEmployee {
  id: number;
  category_name: string;
}

interface IEmployeesResponse {
  status: boolean;
  data: IEmployee[];
}
export default function ManageEmployee() {
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<IEmployeesResponse>();

  useEffect(() => {
    axios.get("http://localhost:3000/auth/categories").then((result) => {
      if (result.data.status) {
        console.log(result.data);
        setAllCategories(result.data);
      } else {
        console.log(result.data, "last");
        toast.error("Internal server error");
      }
    });
  }, []);
  return (
    <Dialog open={isDialogueOpen} onOpenChange={setIsDialogueOpen}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <DialogTrigger className="flex justify-end" asChild>
          <Button type="button" className="ml-auto cursor-pointer">
            Add Employee
          </Button>
        </DialogTrigger>
      </div>
      <Table className="bg-gray-400 rounded-md mt-4">
        <TableCaption>A list of your company employees category.</TableCaption>
        <TableHeader>
          <TableRow className="font-bold text-xl">
            <TableHead>Id</TableHead>
            <TableHead>Employee name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCategories?.data.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.category_name}</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogContent className="sm:max-w-[425px] bg-gray-500">
        <DialogHeader>
          <DialogTitle className="text-center">Add Employee</DialogTitle>
        </DialogHeader>
        <AddEmployee setIsDialogueOpen={setIsDialogueOpen} />
      </DialogContent>
    </Dialog>
  );
}
