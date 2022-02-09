import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from '@mui/material/Pagination';
import { alpha, styled } from "@mui/material/styles";
import Switch from '@mui/material/Switch';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import thirukkural from "../data/thirukkural.json";
import Kural from "./Kural";
import NestedList from "./NestedList";
import Tooltip from '@mui/material/Tooltip';

const drawerWidth = 300;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const options = [
  { displayTamil: "மு.வரதராசன்", key: "mv", disabled: true },
  { displayTamil: "சாலமன் பாப்பையா", key: "sp", disabled: false },
  { displayTamil: "மு.கருணாநிதி", key: "mk", disabled: false },
];
const tamilPauls = ["அறத்துப்பால்", "பொருட்பால்", "காமத்துப்பால்"];
const englishPauls = ["Virtue", "Wealth", "Love"];

export default function LandingPage() {
  const listofkural = thirukkural["kural"];
  const srchList = listofkural.map((item)=>Object.values(item).join(' ').toLowerCase())
  const [eng, setEng] = useState(false);
  const [srchResult, setSrchResult] = useState([]);
  const [srchval, setSrchval] = useState('');
  const [page, setPage] = useState(1);
  const [pauls, setPauls] = useState(tamilPauls);
  const [section, setSection] = useState("கடவுள் வாழ்த்து");
  const [sectionText, setSectionText] = useState("கடவுள் வாழ்த்து");
  const [path, setPath] = useState("அறத்துப்பால் / பாயிரவியல் / கடவுள் வாழ்த்து");
  const [Exp, setExp] = useState(["mv"]);
  const [sectionDrawer, setSectionDrawer] = useState(false);
  const handleLang = ()=> {
    setEng(!eng);
    setPauls(!eng ? englishPauls : tamilPauls)
    setAnchorEl(null);
    const obj = listofkural[(page-1)*10]
    setSection(eng ? obj.adikaram_translation : obj.adikaram_name)
  }
  const changePage= (e,page)=> {
    setPage(page)
    const obj = listofkural[(page-1)*10]
    setSection(eng ? obj.adikaram_translation : obj.adikaram_name)
  }
  const toggleDrawer = () => setSectionDrawer(!sectionDrawer);
  const openSection = (section) =>{
    setSection(section);
    const page = listofkural.findIndex((kural)=>[kural.adikaram_name, kural.adikaram_translation].includes(section))
    setPage((page/10)+1)
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (e) => {
    if (Exp.includes(e.target.id))
      return setExp(Exp.filter((item) => item !== e.target.id));
    setExp([...Exp, e.target.id]);
  };
  useEffect(() => {
    const obj = listofkural.find((kural) => kural.adikaram_name === section || kural.adikaram_translation === section);
    const path = eng ? obj.paul_translation + " / " + obj.iyal_translation + " / " + obj.adikaram_translation : obj.paul_name + " / " + obj.iyal_name + " / " + obj.adikaram_name
    setPath(path);
    setSectionText(eng ? obj.adikaram_translation : obj.adikaram_name)
  }, [section, listofkural, eng]);
  const handleSearch = (e) => {
    setSrchval(e.target.value)
    setSrchResult([]);
  }
  const srch = (val) => {
    val = val.toLowerCase();
    var result = [];
    for (var i = 0, len = srchList.length; i < len; i++) {
      if (srchList[i].indexOf(val) !== -1) result.push(i)
    }
    setSrchResult(result);
  }
  const startSearch = (e) => {
    if(e.key === 'Enter' || e.keyCode === 13){
      if (srchval) srch(srchval)
    }
  }
  const clearSrch = ()=> {
    setSrchval("")
    setSrchResult([]);
  }
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {sectionDrawer ? <CloseIcon /> : 
            (<Tooltip title="View Sections">
              <MenuIcon />
            </Tooltip>)
            }
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {eng ? "Thirukural" : "திருக்குறள்"}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
              onKeyPress={startSearch}
              value={srchval}
            />
          </Search>
          {srchval && (<Tooltip title="Clear Search">
              <CloseIcon onClick={clearSrch}/>
            </Tooltip>)
          }
          &nbsp;filters:&nbsp;
          <Tooltip title="Other Tamil Explanation">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              color="inherit"
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Switch Language">
            <Switch color="default" checked={eng} onChange={handleLang}/>
          </Tooltip>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={!eng && open}
            onClose={handleClose}
          >
            {options.map((option) => (
              <MenuItem
                key={option.key}
                selected={Exp.includes(option.key)}
                id={option.key}
                onClick={handleMenu}
                disabled={option.disabled}
              >
                {option.displayTamil}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={sectionDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <Scrollbars style={{ width: "100%", height: "100%" }}>
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List component="div" disablePadding>
              {pauls.map(
                (text, index) => (
                  <NestedList
                    openSection={openSection}
                    key={index}
                    text={text}
                    pl={2}
                    eng={eng}
                  />
                )
              )}
            </List>
          </Box>
        </Scrollbars>
      </Drawer>
      <Main open={sectionDrawer}>
        <Toolbar />
        {!srchval &&
        <>
          <h2>{sectionText}</h2>
          <h4>{path}</h4>
          {listofkural.slice((page-1)*10,((page-1)*10)+10).map((kural, index) => {
              return (
                <Kural
                  kural={kural}
                  key={index}
                  Exp={Exp}
                  eng={eng}
                />
              );
            })
          }
          <div style={{display: "flex", justifyContent: "center" }}>
            <Pagination count={133} page={page} onChange={changePage} siblingCount={5} color="primary" />
          </div>
        </>}
        {srchval &&
          srchResult.map(indVal =>
              <Kural
                kural={listofkural[indVal]}
                key={indVal}
                Exp={Exp}
                eng={eng}
              />
            )
        }
        {srchval &&
          !srchResult.length && (<div style={{display: "flex", justifyContent: "center" }}>
              <h1>Press enter to search</h1>
            </div>)
        }
      </Main>
    </Box>
  );
}
