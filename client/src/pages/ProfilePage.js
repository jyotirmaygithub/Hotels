import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MyStyledTextField from "../components/myStyledTextField";
import { Logout } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { TokenStatusContext } from "../context/tokenStatus";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FrontAuthFunction } from "../context/front-auth";
import { StateContext } from "../context/States";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

export default function ActionAreaCard() {
  const { deleteAuthTokenCookie } = TokenStatusContext();
  const navigate = useNavigate();
  const { handleEditProfile } = FrontAuthFunction();
  const { userDocument } = StateContext();
  const { name, email, picture } = userDocument;
  // To enable changing username at run time.
  const [combinedState, setCombinedState] = useState({
    username: name,
  });
  let newUserPicture =  "C:/Users/jyotirmay gupta/Pictures/village/DSC02131.ARW"

  useEffect(()=>{
    setCombinedState({username : name})
  },[userDocument]);

  function onchange(e) {
    setCombinedState({ ...combinedState, [e.target.name]: e.target.value });
  }

  function handleLogout() {
    deleteAuthTokenCookie();
    navigate("/");
  }
  async function handleSubmit() {
    returnResponse( await handleEditProfile(combinedState.username ,newUserPicture))
  }
  function returnResponse(response){
    console.log("what is response = " , response)
    if (response.success) {
      toast.success(response.message)
      navigate('/')
    }
    else{
      toast.error(response.message);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="p-4">
        <CardActionArea className="flex-col justify-center">
            <Avatar
              alt="profile picture"
              src={picture}
              sx={{ width: 250, height: 250 }}
            />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {email ? email : ""}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className="flex-col justify-center py-4 space-y-2">
          <MyStyledTextField
            margin="normal"
            value={combinedState.username}
            required
            fullWidth
            id="username"
            name="username"
            autoComplete="name"
            onChange={onchange}
            autoFocus
          />
          <div className="flex justify-between">
            <Button
              onClick={handleSubmit}
              variant="outlined"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            {/* <input type="file" onChange={todealwithimage} /> */}
            <Button
              onClick={handleLogout}
              variant="contained"
              startIcon={<Logout />}
            >
              Logout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
