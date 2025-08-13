import { useEffect, useState } from "react";
import { DialogFooter } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { ICategoriesResponse } from "../Categories/Categories";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IUpdateCategoryProps {
  setIsUpdateEmployeeDialogueOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  employee: IEmployee;
}
interface IEmployee {
  id: number | string;
  name: string;
  category_name: string;
  salary: number | string;
  join_date: string | undefined;
}
const UpdateEmployee: React.FC<IUpdateCategoryProps> = ({
  setIsUpdateEmployeeDialogueOpen,
  employee,
}) => {
  const [employeeInfo, setEmployeeInfo] = useState<IEmployee>(employee);
  const [allCategories, setAllCategories] = useState<ICategoriesResponse>();
  const [isCalenderOpen, setIsCalenderOpen] = React.useState(false);
  const [joinDate, setJoinDate] = React.useState<Date | undefined>(undefined);
  useEffect(() => {
    axios.get("http://localhost:3000/auth/categories").then((result) => {
      if (result.data.status) {
        setAllCategories(result.data);
      } else {
        console.log(result.data, "last");
        toast.error("Internal server error");
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3000/auth/update-employee/${employee.id}`,
        employeeInfo
      )
      .then((result) => {
        if (result.data.status) {
          setEmployeeInfo({
            id: "",
            name: "",
            category_name: "",
            salary: "",
            join_date: "",
          });
          setIsUpdateEmployeeDialogueOpen(false);
          toast.success("Employee updateed successful!");
        } else {
          console.error(
            "Error submitting on update employee:",
            result.data.Error
          );
        }
      });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-black">
          Employee Name
        </label>
        <input
          id="name"
          defaultValue={employee.name}
          onChange={(e) =>
            setEmployeeInfo({ ...employeeInfo, name: e.target.value })
          }
          type="text"
          placeholder="Enter employee name"
          className="w-full border border-gray-300 mt-3 rounded-md px-3 py-2 text-black"
          autoFocus
          required
        />
      </div>
      <div>
        <label
          htmlFor="category_name"
          className="block text-sm font-medium text-black"
        >
          Category Name
        </label>
        <select
          className="w-full border border-gray-300 mt-3 rounded-md px-3 py-2 text-black"
          name="category_name"
          value={employee.category_name}
          required
          id="category_name"
          onChange={(e) =>
            setEmployeeInfo({ ...employeeInfo, category_name: e.target.value })
          }
        >
          <option value="">Select a category</option>
          {allCategories?.data.map((category) => (
            <option key={category.id} value={`${category.category_name}`}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="salary"
          className="block text-sm font-medium text-black"
        >
          Salary
        </label>
        <input
          id="salary"
          defaultValue={employee.salary}
          name="salary"
          onChange={(e) =>
            setEmployeeInfo({ ...employeeInfo, salary: e.target.value })
          }
          type="text"
          placeholder="Enter salary"
          className="w-full border border-gray-300 mt-3 rounded-md px-3 py-2 text-black"
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <label
          htmlFor="join_date"
          className="block text-sm font-medium text-black"
        >
          Join date
        </label>
        <Popover open={isCalenderOpen} onOpenChange={setIsCalenderOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="join_date"
              className="w-full bg-gray-500 justify-between hover:bg-transparent focus:bg-transparent"
            >
              {joinDate ? joinDate.toLocaleDateString() : employee.join_date}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden hover:bg-none p-0"
            align="start"
          >
            <Calendar
              mode="single"
              required
              selected={joinDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                setJoinDate(date);

                setIsCalenderOpen(false);
                setEmployeeInfo({
                  ...employeeInfo,
                  join_date: date?.toISOString().split("T")[0],
                });
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button
            onClick={() => setIsUpdateEmployeeDialogueOpen(false)}
            type="button"
            variant="outline"
            className="cursor-pointer"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="cursor-pointer">
          Update
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpdateEmployee;
