import React, { useState } from 'react';
import { ArrowUpRight, Award, FileText, Briefcase, Globe, X } from 'lucide-react';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter, FaGithub } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import Button from '@/utils/Buttons/Button';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  maxWidth: '100%',
  width: '1200px',
  maxHeight: '95vh',
  overflow: 'auto'
};

const MemberCard= ({
  id,
  fullName,
  position,
  batch,
  profileImg,
  bio,
  skills,
  socialLinks,
  achievements,
  certificates,
  projects,
  contributions,
  onClick,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Only show first 5 skills in the card
  const displaySkills = skills.slice(0, 3);
  const hasMoreSkills = skills.length > 3;

  return (
    <div className="bg-white group hover:cursor-pointer hover:shadow-lg duration-75 px-2 py-2 border-t-[1px] shadow-md rounded-sm relative">
      {/* Main Card Content */}
      <div className="flex flex-col h-full">
        {/* Profile Image */}
        <div className="relative">
          <div onClick={handleOpen} className="overflow-hidden rounded-lg">
            <img
              src={profileImg}
              className="hover:scale-100 duration-150 custom-clip rounded-t-lg rounded-l-lg lg:w-[42vh] w-[70vh] h-56 object-cover"
              alt={`${fullName}'s Profile`}
            />
          </div>

          {/* Batch Badge */}
          <div className="absolute bottom-0 left-0 bg-[#ca0019] px-2 py-1">
            <p className="text-white text-sm font-medium">{batch}</p>
          </div>
        </div>

        {/* Card Content */}
        <div className="py-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold border-b border-gray-300 pb-1">{fullName}</h3>
          <p className="text-gray-600 text-sm mt-1">{position}</p>

          {/* Skills */}
          <div className="mt-3 flex flex-wrap gap-1">
            {displaySkills.map((skill, index) => (
              <span key={index} className="flex flex-wrap text-xs bg-gray-100 px-2 py-1 rounded-full">
                {skill.name}
              </span>
            ))}
            
            {hasMoreSkills && (
              <span className="text-xs text-center bg-[#ca0019] text-white px-1 py-[4px] rounded-full">+{skills.length - 5}</span>
            )}
          </div>

          {/* Achievements Preview */}
          {achievements.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-semibold items-center gap-1 flex flex-wrap">
                <Award className="w-3 h-3" /> Achievements
              </h4>
              <div className="flex mt-1 gap-1 flex-wrap">
                {achievements.slice(0, 2).map((achievement) => (
                  <span
                    key={achievement.id}
                    className={`bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full`}
                  >
                    {achievement.title}
                  </span>
                ))}
                {achievements.length > 2 && (
                  <span className=" text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    +{achievements.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Social Media Links */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col pt-4 gap-2 bg-black bg-opacity-80 lg:p-[8px] p-[7px]">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaGithub size={16} />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaLinkedinIn size={16} />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaXTwitter size={16} />
            </a>
          )}
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <FaInstagram size={16} />
            </a>
          )}
          {socialLinks.website && (
            <a
              href={socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Globe size={16} />
            </a>
          )}
        </div>

        {/* View Details Button */}
        <button
          onClick={handleOpen}
          className="absolute bottom-4 right-4 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-[#ca0019] transition-colors"
        >
          <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>

      {/* MUI Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="member-modal-title"
        aria-describedby="member-modal-description"
      >
        <Box sx={style}>
          {/* Close Button */}
          <div
            onClick={handleClose}
            className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile Image and Basic Info */}
            <div className="md:col-span-1">
              <div className="relative mb-5">
                <img
                  src={profileImg || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"}
                  alt={`${fullName}'s profile`}
                  className="w-full h-64 rounded-lg object-cover shadow-md"
                />
                <div className="absolute bottom-0 left-0 bg-[#ca0019] px-2 py-1">
                  <p className="text-white text-sm font-medium">{batch}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-1">{fullName}</h3>
                <p className="text-gray-600 mt-1 italic">{position}</p>
              </div>

              {/* <Button
                path="/profile"
                bgColor={theme.palette.primary?.main || "#ca0019"}
                color="white"
                border={0}
                borderColor={theme.palette.primary?.dark || "#9a0014"}
                onClick={() => navigate('/profile')}
              >
                <span>Know More</span>
              </Button> */}

              {/* Social Links */}
              <div className="mb-6 mt-6">
                <h4 className="font-semibold mb-3 text-gray-800">Connect</h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      <FaGithub size={14} />
                      GitHub
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      <FaLinkedinIn size={14} />
                      LinkedIn
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      <FaXTwitter size={14} />
                      Twitter
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      <FaInstagram size={14} />
                      Instagram
                    </a>
                  )}
                  {socialLinks.website && (
                    <a
                      href={socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      <Globe size={14} />
                      Website
                    </a>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="text-sm bg-gray-100 px-3 py-1.5 rounded-full">
                      {skill.name}
                      {skill.level && <span className="ml-1 text-xs text-gray-500">• {skill.level}</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Tabs Content */}
            <div className="md:col-span-2">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "about"
                      ? "border-b-2 border-[#ca0019] text-[#ca0019]"
                      : "text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "certificates"
                      ? "border-b-2 border-[#ca0019] text-[#ca0019]"
                      : "text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                  onClick={() => setActiveTab("certificates")}
                >
                  Certificates
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "projects"
                      ? "border-b-2 border-[#ca0019] text-[#ca0019]"
                      : "text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                  onClick={() => setActiveTab("projects")}
                >
                  Projects
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "about" && (
                <div>
                  {/* Bio */}
                  <div className="mb-8">
                    <h4 className="font-semibold mb-3 text-gray-800">About</h4>
                    <p className="text-gray-700 leading-relaxed">{bio}</p>
                  </div>

                  {/* Achievements */}
                  {achievements.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-semibold mb-4 flex items-center gap-1.5 text-gray-800">
                        <Award className="w-4 h-4" /> Achievements
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {achievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`${achievement.color} text-white p-2 rounded-full flex items-center justify-center`}
                              >
                                {achievement.icon || <Award className="w-4 h-4" />}
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">{achievement.title}</h5>
                                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                                {achievement.date && (
                                  <p className="text-xs text-gray-500 mt-1.5">{achievement.date}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contributions */}
                  {contributions && contributions.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-800">Community Contributions</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 pl-1">
                        {contributions.map((contribution, index) => (
                          <li key={index} className="leading-relaxed">{contribution}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "certificates" && (
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-1.5 text-gray-800">
                    <FileText className="w-4 h-4" /> Certificates & Credentials
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
                    {certificates.map((certificate) => (
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
              )}

              {activeTab === "projects" && (
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-1.5 text-gray-800">
                    <Briefcase className="w-4 h-4" /> Projects
                  </h4>
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        {project.imageUrl && (
                          <div className="aspect-[21/9] overflow-hidden bg-gray-50">
                            <img
                              src={project.imageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <h5 className="font-medium text-lg text-gray-900">{project.title}</h5>
                          <p className="text-gray-700 my-3 leading-relaxed">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, index) => (
                              <span key={index} className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-[#ca0019] hover:underline flex items-center gap-1 font-medium"
                            >
                              View Project <ArrowUpRight size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MemberCard;