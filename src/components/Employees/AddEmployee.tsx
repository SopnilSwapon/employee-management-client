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

interface IAddCategoryProps {
  setIsDialogueOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IEmployee {
  name: string;
  category_name: string;
  salary: number | string;
  join_date: string | undefined;
}
const AddEmployee: React.FC<IAddCategoryProps> = ({ setIsDialogueOpen }) => {
  const [employeeInfo, setEmployeeInfo] = useState<IEmployee>({
    name: "",
    category_name: "",
    salary: "",
    join_date: "",
  });
  const [allCategories, setAllCategories] = useState<ICategoriesResponse>();
  const [isCalenderOpen, setIsCalenderOpen] = React.useState(false);
  const [joinDate, setJoinDate] = React.useState<Date | undefined>(undefined);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add-employee", employeeInfo)
      .then((result) => {
        if (result.data.status) {
          setEmployeeInfo({
            name: "",
            category_name: "",
            salary: "",
            join_date: "",
          });
          setIsDialogueOpen(false);
          toast.success("Employee added successful!");
          console.log(result.data.status);
        } else {
          console.error("Error submitting add employee:", result.data.Error);
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
          required
          id="category_name"
          onChange={(e) =>
            setEmployeeInfo({ ...employeeInfo, category_name: e.target.value })
          }
        >
          <option value="">Select a category</option>
          {allCategories?.data.map((category) => (
            <option value={`${category.category_name}`}>
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
              {joinDate ? joinDate.toLocaleDateString() : "Select date"}
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
          <Button type="button" variant="outline" className="cursor-pointer">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="cursor-pointer">
          Add
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AddEmployee;
