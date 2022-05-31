import "./topbar.css";
import { Search } from "@mui/icons-material";

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
        <img src="/assets/person/1.jpg" alt="" className="topbarImg"/>
      </div>
    </div>
  );
}