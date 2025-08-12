import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ManageEmployee() {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("clicked");
    if (!category.trim()) {
      alert("Category cannot be empty");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/add-category", {
        category,
      });
      console.log("Success:", res.data);
      setCategory("");
      // You can close the dialog here programmatically if you want
    } catch (err) {
      console.error("Error submitting category:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Add Category</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-gray-500">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Enter the name of the category you want to create.
          </DialogDescription>
        </DialogHeader>

        {/* Form inside dialog content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-black"
            >
              Category Name
            </label>
            <input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="Enter category name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
