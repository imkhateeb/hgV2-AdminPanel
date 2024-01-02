import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
const Actions = ({
  handleDelete,
  setEdit,
  param,
  setDetailPopUp,
  handleVerifyAssignment,
  show = false,
  submission = false
}) => {
  return (
    <DropdownMenu className="">
      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="h-8 w-8 p-0 focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent focus-visible:bg-transparent "
        >
          <span className="font-bold text-3xl -mt-4">...</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" className="">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setDetailPopUp(true)}
        >
          View
        </DropdownMenuItem>
       { !submission && <DropdownMenuItem
          onClick={() => setEdit(true)}
          className="cursor-pointer"
        >
          Edit
        </DropdownMenuItem>}
       { !submission && <DropdownMenuItem
          onClick={() => handleDelete(param?._id)}
          className="cursor-pointer "
        >
          Delete
        </DropdownMenuItem>}
        { submission && <DropdownMenuItem
          onClick={() => handleVerifyAssignment(true)}
          className="cursor-pointer "
        >
          Verify
        </DropdownMenuItem>}
        {show && (
          <>
            {" "}
            <DropdownMenuLabel className='border-t-2'>Show</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={()=>console.log('Clicked')}
            >
              <Link to={`/topics/${param?._id}`}>Topics</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer "
            >
            <Link to={`/assignments/${param?._id}`}>Assignments</Link>
            </DropdownMenuItem>{" "}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
