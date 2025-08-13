import React from "react";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

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
import UpdateEmployee from "./UpdateEmployee";

export interface IEmployee {
  id: number;
  name: string;
  category_name: string;
  salary: number;
  join_date: string;
}

interface IEmployeesResponse {
  status: boolean;
  data: IEmployee[];
}
export default function ManageEmployee() {
  const [isAddEmployeeDialogueOpen, setIsAddEmployeeDialogueOpen] =
    useState(false);
  const [isUpdateEmployeeDialogueOpen, setIsUpdateEmployeeDialogueOpen] =
    useState(false);
  const [allEmployees, setAllEmployees] = useState<IEmployeesResponse>();
  const [employee, setEmployee] = useState<IEmployee>();

  useEffect(() => {
    axios.get("http://localhost:3000/auth/employees").then((result) => {
      if (result.data.status) {
        setAllEmployees(result.data);
      } else {
        toast.error("Internal server error");
      }
    });
  }, []);
  return (
    <>
      <Dialog
        open={isAddEmployeeDialogueOpen}
        onOpenChange={setIsAddEmployeeDialogueOpen}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Employees</h1>
          <DialogTrigger className="flex justify-end" asChild>
            <Button type="button" className="ml-auto cursor-pointer">
              Add Employee
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[425px] bg-gray-500">
          <DialogHeader>
            <DialogTitle className="text-center">Add Employee</DialogTitle>
          </DialogHeader>
          <AddEmployee
            setIsAddEmployeeDialogueOpen={setIsAddEmployeeDialogueOpen}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isUpdateEmployeeDialogueOpen}
        onOpenChange={setIsAddEmployeeDialogueOpen}
      >
        <DialogContent className="sm:max-w-[425px] bg-gray-500">
          <DialogHeader>
            <DialogTitle className="text-center">Update Employee</DialogTitle>
          </DialogHeader>
          <UpdateEmployee
            employee={employee!}
            setIsUpdateEmployeeDialogueOpen={setIsUpdateEmployeeDialogueOpen}
          />
        </DialogContent>
      </Dialog>
      <Table className="bg-gray-400 rounded-md mt-4">
        <TableCaption>A list of your company employees category.</TableCaption>
        <TableHeader>
          <TableRow className="font-bold text-xl">
            <TableHead>Id</TableHead>
            <TableHead>Employee name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Join date</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allEmployees?.data.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.category_name}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell>{employee.join_date}</TableCell>
              <TableCell>
                <CiEdit
                  onClick={() => {
                    setEmployee(employee);
                    setIsUpdateEmployeeDialogueOpen(true);
                  }}
                  className="text-2xl cursor-pointer hover:bg-white hover:rounded-sm"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
