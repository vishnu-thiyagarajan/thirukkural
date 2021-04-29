import React from 'react'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import breadcrumbNameMap from '../data/breadcrumbs.json';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '35%'
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
    // marginLeft: theme.spacing(4),
  },
}));

function ListItemLink(props) {
  const { to, open, ...other } = props;
  // const primary = breadcrumbNameMap[to];
  
  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={to.split('/').slice(-1).pop()} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

function NestedLink(props){
  const { to } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <ListItemLink to={to} open={open} onClick={handleClick} />
      {Array.isArray(breadcrumbNameMap[to]) &&
        breadcrumbNameMap[to].map((val,index)=>
        <Collapse component="li" in={open} timeout="auto" unmountOnExit key={index}>
        <List className={classes.nested}>
          {Array.isArray(breadcrumbNameMap[to + "/" + val]) && <NestedLink to={to + "/" + val} />}
          {!Array.isArray(breadcrumbNameMap[to + "/" + val]) && <ListItemLink to={to + "/" + val} />}
        </List>
      </Collapse>
      )}
    </>
  )
}
ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function Bookview() {
  const classes = useStyles();
  return (
    <MemoryRouter initialEntries={['/அறத்துப்பால்']} initialIndex={0}>
      <div className={classes.root}>
        <Route>
          {({ location }) => {
            const pathnames = location.pathname.split('/').filter((x) => x);

            return (
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter color="inherit" to="/">
                  திருக்குறள்
                </LinkRouter>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {to.split('/').slice(-1).pop()}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" to={to} key={to}>
                      {to.split('/').slice(-1).pop()}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
        <nav className={classes.lists} aria-label="mailbox folders">
          <List>
          <NestedLink to={"/அறத்துப்பால்"} />
          <NestedLink to={"/பொருட்பால்"} />
          <NestedLink to={"/காமத்துப்பால்"} />
            {/* <ListItemLink to="/அறத்துப்பால்" open={open} onClick={handleClick} />
            {Array.isArray(breadcrumbNameMap["/அறத்துப்பால்"]) &&
              breadcrumbNameMap["/அறத்துப்பால்"].map((val)=>
              <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to={"/அறத்துப்பால்/"+val} open={sectionOpen} onClick={handleSectionClick} className={classes.nested} />
                {Array.isArray(breadcrumbNameMap["/அறத்துப்பால்/"+val]) &&
                  breadcrumbNameMap["/அறத்துப்பால்/"+val].map((value)=>
                  <Collapse component="li" in={sectionOpen} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      <ListItemLink to={"/அறத்துப்பால்/"+value} className={classes.nested} />
                    </List>
                  </Collapse>
                  )}
              </List>
            </Collapse>
              )} */}
            {/* {!Array.isArray(breadcrumbNameMap["/அறத்துப்பால்"]) &&
              breadcrumbNameMap["/அறத்துப்பால்"].map((val)=>
              <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to={"/அறத்துப்பால்/"+val} className={classes.nested} />
              </List>
            </Collapse>
              )} */}
            {/* <ListItemLink to="/பொருட்பால்" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to="/பொருட்பால்/அரசியல்" className={classes.nested} />
              </List>
            </Collapse>
            <ListItemLink to="/காமத்துப்பால்" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink to="/காமத்துப்பால்/களவியல்" className={classes.nested} />
              </List>
            </Collapse> */}
          </List>
        </nav>
      </div>
      <p>sddddddddddd</p>
    </MemoryRouter>
  );
}
