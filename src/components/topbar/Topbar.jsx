import "./topbar.css";
import { Logout, Search, UploadFile } from "@mui/icons-material";
import Button from '@mui/material/Button';

export default function Topbar() 
{
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">LookMeUp</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for anything"
            className="searchInput"
          />
        </div>
      </div>
      
      
      <div className="topbarRight">
      <span className="helloUser">Hello, User</span>
        <img src="/assets/person/1.jpg" alt="" className="topbarImg"/>
        {/* <div className="logout">
                    <Button variant="contained" color="success" endIcon={<UploadFile />}>
                       Logout
                    </Button>
                    </div> */}
                    {/* <div className="logoutButton">
                    <Logout  sx={{ 
                        color: "#1877f2", 
                        backgroundColor: "#fefeff",
                        borderRadius: "8px",
                         }}/>
                    </div> */}
      </div>
    
    </div>
  );
}