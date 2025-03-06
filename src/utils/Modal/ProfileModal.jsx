import * as React from "react";
import { Button, Modal, Tooltip } from "@mui/material";
import tu from "@/assets/logos/tu.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { ArrowUpRight, Award, FileText, Briefcase, Globe, X } from 'lucide-react';

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BusinessIcon from "@mui/icons-material/Business";
import PropTypes from "prop-types";
import { LineChart } from "@mui/x-charts/LineChart";
import { dataset } from "@/assets/dummyData/gdpData";
import LabelIcon from "@mui/icons-material/Label";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ProfileModal = ({ open, handleClose, user }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="h-screen overflow-y-scroll bg-white p-4">
        <div className="flex justify-end py-2 mb-3">
          <Tooltip title="Close" arrow>

          <div
            onClick={() => handleClose}
            className="p-3 w-12 h-12 rounded-full cursor-pointer flex items-center justify-center hover:bg-slate-200"
            >
            <CloseIcon fontSize="large" />
          </div>
            </Tooltip>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 col-span-1 mb-7 gap-x-6 gap-y-5">
          <div className="xl:col-span-1 lg:col-span-1 col-span-1 flex gap-x-5 items-center">
            <div className="bg-black w-36 h-36 overflow-hidden rounded-full">
              <img
                src={user.profilePic}
                className="w-full h-full object-center"
                alt=""
              />
            </div>
            <div>
              <span className="text-xs text-slate-500">//member</span>
              <p className="text-3xl font-medium">{user.fullName}</p>
              <div className="flex justify-start gap-x-4 mt-3">
                {user.githubProfile && (
                  <Link to={user.githubProfile || ""}>
                    <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
                      <div className="w-full h-full flex items-center justify-center">
                        <GitHubIcon fontSize="small" className="text-white" />
                      </div>
                    </div>
                  </Link>
                )}
                {user.linkedinProfile && (
                  <Link to={user.linkedinProfile || ""}>
                    <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
                      <div className="w-full h-full flex items-center justify-center">
                        <LinkedInIcon fontSize="small" className="text-white" />
                      </div>
                    </div>
                  </Link>
                )}
                {user.twitterProfile && (
                  <Link to={user.twitterProfile || ""}>
                    <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
                      <div className="w-full h-full flex items-center justify-center">
                        <XIcon fontSize="small" className="text-white" />
                      </div>
                    </div>
                  </Link>
                )}
                {user.whatsappContact && (
                  <Link to={`https://wa.me/${user.whatsappContact}` || ""}>
                    <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
                      <div className="w-full h-full flex items-center justify-center">
                        <WhatsAppIcon fontSize="small" className="text-white" />
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="border-l p-5 xl:col-span-2 lg:col-span-1 col-span-1">
            <div className="flex items-center justify-start gap-x-3 mb-3">
              <img src={tu} className="h-7 w-7 object-contain" alt="" />
              <p className="text-slate-500">
                <span className="font-medium">Batch:</span> {user.batch}
              </p>
            </div>
            <div className="flex items-center gap-x-3 mb-4">
              <AutoStoriesIcon fontSize="medium" className="text-slate-500" />
              <p className="text-slate-500">
                <span className="font-medium">Course:</span> {user.course}
              </p>
            </div>
            <div className="flex items-center gap-x-3 mb-4">
              <LabelIcon fontSize="medium" className="text-slate-500" />
              <p className="text-slate-500">
                <span className="font-medium">Admn No:</span> {user.admno}
              </p>
            </div>
            <div className="flex items-center gap-x-3 mb-4">
              <BusinessIcon fontSize="medium" className="text-slate-500" />
              <p className="text-slate-500">
                <span className="font-medium">Placement:</span>{" "}
                {user.isPlaced === true ? "Placed" : "Not Placed"}
              </p>
            </div>
            <div className="flex items-center justify-end gap-x-3 mb-4">
              <LoginIcon fontSize="small" className="text-slate-500" />
              <p className="text-slate-500 text-sm">
                <span className="font-medium">User joined on:</span>{" "}
                {user.createdAt}
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center h-full gap-x-3">
              <Button variant="outlined" color="primary" size="medium">
                <EditIcon fontSize="small" /> Edit
              </Button>
              <Button variant="contained" color="primary" size="medium">
                Impose Fine
              </Button>
              <Button variant="contained" color="primary" size="medium">
                Block
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="lg:col-span-1 col-span-4">
            <h3 className="text-xl font-medium">Overview</h3>
            <div className="my-3 ">
              <div>
                <p className="bg-black p-1 px-2 rounded-tr-full text-white">
                  BIO
                </p>
                <div className="py-3 px-2 bg-slate-50 border border-slate-200 rounded-b-md">
                  <div className="flex items-start mb-2 gap-x-3">
                    <BookmarkIcon fontSize="small" className="text-slate-500" />
                    <p className="text-slate-500 text-sm">{user.bio}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3 ">
              <div>
                <p className="bg-black p-1 px-2 rounded-tr-full text-white">
                  CONTACT INFORMATION
                </p>
                <div className="py-3 px-2 bg-slate-50 border border-slate-200 rounded-b-md">
                  <div className="flex items-center mb-2 gap-x-3">
                    <EmailIcon fontSize="small" className="text-slate-500" />
                    <p className="text-slate-500 text-sm">{user.email}</p>
                  </div>
                  <div className="flex items-center mb-2 gap-x-3">
                    <PhoneIcon fontSize="small" className="text-slate-500" />
                    <p className="text-slate-500 text-sm">
                      <Link to={`tel:${user.contact}`}>{user.contact}</Link>
                    </p>
                  </div>
                  <div className="flex items-start mb-2 gap-x-3">
                    <LocationOnIcon
                      fontSize="small"
                      className="text-slate-500"
                    />
                    <p className="text-slate-500 text-sm">
                      {user.address} | {user.city}, {user.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3 ">
              <div>
                <p className="bg-black p-1 px-2 rounded-tr-full text-white">
                  SKILLS
                </p>
                <div className="py-3 bg-slate-50 border border-slate-200 rounded-b-md">
                  {user.skills.map((skill, index) => {
                    return (
                      <span
                        key={index}
                        className="bg-slate-200 text-xs my-1 inline-block mx-1 p-1 px-2 rounded-full"
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-4">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"  
                >
                  <Tab label="Statistics" {...a11yProps(0)} />
                  <Tab label="Achievements" {...a11yProps(1)} />
                  <Tab label="Certifications" {...a11yProps(2)} />
                  <Tab label="Projects" {...a11yProps(3)} />
                  <Tab label="Events" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {/* <LineChart
                  dataset={dataset}
                  xAxis={[
                    {
                      id: "Years",
                      dataKey: "date",
                      scaleType: "time",
                      valueFormatter: (date) => date.getFullYear().toString(),
                    },
                  ]}
                  series={[
                    {
                      id: "France",
                      label: "French GDP per capita",
                      dataKey: "fr",
                      stack: "total",
                      area: true,
                      showMark: false,
                    },
                    {
                      id: "Germany",
                      label: "German GDP per capita",
                      dataKey: "dl",
                      stack: "total",
                      area: true,
                      showMark: false,
                    },
                    {
                      id: "United Kingdom",
                      label: "UK GDP per capita",
                      dataKey: "gb",
                      stack: "total",
                      area: true,
                      showMark: false,
                    },
                  ]}
                  width={600}
                  height={400}
                  margin={{ left: 70 }}
                /> */}
                Stats
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Achievements
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
              <div>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-5">
                    {user.certifications.map((certificate) => (
                      <div
                        key={certificate.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="aspect-[16/9] overflow-hidden bg-gray-50 flex items-center justify-center">
                          <img
                            src={certificate.imageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
                            alt={certificate.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="font-medium text-gray-900">{certificate.title}</h5>
                          <p className="text-sm text-gray-600 mt-1">{certificate.issuer}</p>
                          <p className="text-xs text-gray-500 mt-1.5">{certificate.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                Projects
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                Events
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
