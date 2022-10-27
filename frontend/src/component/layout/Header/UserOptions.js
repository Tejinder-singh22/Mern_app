import React, { Fragment, useState } from "react";
import "./Header.css";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
 
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from "react-router-dom";



const UserOptions = ({user}) => {
//   const { cartItems } = useSelector((state) => state.cart);
const [open, setOpen] = useState(false);
const dispatch = useDispatch();
const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
     
      
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  let navigate = useNavigate();

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert("Logout Successfully");
  }

  return (
    <Fragment>
      <SpeedDial
  ariaLabel="SpeedDial basic example"
  onClose={()=>setOpen(false)}
  onOpen={()=>setOpen(true)}
  open={open}
  direction = "down"
  className="speedDial"
  icon={<img className="speedDialIcon"
         src={user.avatar.url ? user.avatar.url : "/Profile.png"}
          alt="Profile"
 />}
>
{options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
    
 
</SpeedDial>
    </Fragment>
  );
};

export default UserOptions;