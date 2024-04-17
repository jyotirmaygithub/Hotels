import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { StateContext } from "../context/States";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Trial from "../components/PopUps/trial";

export default function ActionAreaCard() {
  const { userDocument } = StateContext();
  const { name, email, picture } = userDocument;

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] space-y-2">
      <div className="flex-col justify-center border-2 border-stone-400 border-solid p-4 rounded-md space-y-10">
        <Trial />
        <Avatar
          alt="profile picture"
          src={picture}
          sx={{ width: 250, height: 250 }}
        />
        <div className="space-y-2">
          <div className="flex justify-start items-center space-x-4">
            <AccountCircleOutlinedIcon className="h-10 w-10" />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {name ? name : ""}
            </Typography>
          </div>
          <div className="flex justify-start items-center space-x-4">
            <EmailOutlinedIcon />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {email ? email : ""}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
