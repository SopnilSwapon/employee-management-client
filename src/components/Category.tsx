import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

export default function Category() {
  const [category, setCategory] = useState("");
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("clicked", category);

    axios
      .post("http://localhost:3000/auth/add-category", {
        category_name: category,
      })
      .then((result) => {
        if (result.data.status) {
          setCategory("");
          setIsDialogueOpen(false);
          toast.success("Category added successful!");
        } else {
          console.error("Error submitting category:", result.data.Error);
        }
      });
  };

  return (
    <Dialog open={isDialogueOpen} onOpenChange={setIsDialogueOpen}>
      <DialogTrigger asChild>
        <Button type="button">Add Category</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-gray-500">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
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
              className="w-full border border-gray-300 mt-3 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
