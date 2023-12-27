import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
const Actions = ({handleDelete,setEdit,param,setDetailPopUp}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0 focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent focus-visible:bg-transparent">
          <span className="font-bold text-3xl -mt-4">...</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"className="" >
        <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => setDetailPopUp(true)}
        >
          View
        </DropdownMenuItem>
        <DropdownMenuItem 
         onClick={() => setEdit(true)}
        className="cursor-pointer">Edit</DropdownMenuItem>
        <DropdownMenuItem
        onClick={() => handleDelete(param?._id)}
         className="cursor-pointer ">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
