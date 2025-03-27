// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { bulkUploadMembers } from "./members.js";
// import Member from "../../models/member/memberModel.js";
// import { sendPendingApprovalEmail } from "../../services/members/sendPendingApprovalEmail.js";

// dotenv.config();

// export const uploadDummyMembers = async (req, res) => {
//     try {
//       const result = await bulkUploadMembers(Member);
      
//       if (result.success) {
//         return res.status(200).json({
//           success: true,
//           message: `Successfully uploaded ${result.count} members`,
//           count: result.count
//         });
        
//       } else {
//         return res.status(500).json({
//           success: false,
//           message: 'Failed to upload members',
//           error: result.error
//         });
//       }
//     } catch (error) {
//       console.error('Error in dummy member upload:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Server error during member upload',
//         error: error.message
//       });
//     }
//   };

// export const register = async (req, res) => {
//     try {
//         const {  email, password} = req.body;
    
//         const member = await Member.findOne({ email });
//         if (member) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 12);
//         const newMember = new Member({
//             // name,
//             email,
//             password: hashedPassword,
//             // city,
//             // state,
//             // course,
//             // batch,
//             // admnNo,
//             // address,
//             // contact,
//             // whatsappContact,
//             profileStatus:"active"
//         });
//         console.log(newMember);
//         await newMember.save();
//         console.log(newMember)
//         // await sendPendingApprovalEmail(email, name);
//         const jwtToken = jwt.sign(
//             { id: newMember._id, role: "member" }, 
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//           );
//           console.log(jwtToken);
//           // Set token as HTTP-only cookie
//           res.cookie("token", jwtToken, {
//             httpOnly: true,
//             secure: true, // Set to true in production
//             sameSite: 'None', // Important for cross-origin
//             maxAge: 3600000, // 1 hour
//           });
          
//         res.status(201).json({ message: "User registered successfully" });
//     }
//     catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }

// }

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const member = await Member.findOne({ email });
//         if (!member) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }
//         if(member.profileStatus === "pending" && member.isVerified === false){
//             return res.status(400).json({ message: "Your profile is pending approval" });
//         }

//         if(member.profileStatus === "blocked" && member.isVerified === false){
//             return res.status(400).json({ message: "Your profile is blocked" });
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, member.password);
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const jwtToken = jwt.sign(
//             { id: member._id, role: "member" }, 
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//           );
      
//           // Set token as HTTP-only cookie
//           res.cookie("token", jwtToken, {
//             httpOnly: true,
//             secure: true, // Set to true in production
//             sameSite: 'None', // Important for cross-origin
//             maxAge: 3600000, // 1 hour
//           });
//         res.status(200).json({ message: "User logged in successfully" });
//     }
//     catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }


// export const logout = (req, res) => {
//     res.clearCookie("token");
//     res.status(200).json({ message: "User logged out successfully" });
// }

// export const editProfile = async (req, res) => {
//     try {
//         const { 
//             name, email, password, city, state, course, batch, 
//             admnNo, address, contact, githubProfile, linkedinProfile, 
//             skills, bio, instagramProfile, certifications 
//         } = req.body;

//         const member = await Member.findOne({ email });

//         if (!member) {
//             return res.status(400).json({ message: "User does not exist" });
//         }

//         // Hash the new password if provided
//         let hashedPassword = member.password;
//         if (password) {
//             hashedPassword = await bcrypt.hash(password, 12);
//         }

//         await Member.updateOne(
//             { email },
//             {
//                 name,
//                 email,
//                 password: hashedPassword,
//                 city,
//                 state,
//                 course,
//                 batch,
//                 admnNo,
//                 address,
//                 contact,
//                 githubProfile,
//                 linkedinProfile,
//                 bio,
//                 instagramProfile,
//                 $addToSet: { 
//                     skills: { $each: skills || [] }, 
//                     certifications: { $each: certifications || [] } 
//                 }
//             }
//         );

//         res.status(200).json({ message: "User profile updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong", error });
//     }
// };



// export const getProfile = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const member = await Member.findOne({
//             email
//         });
//         if (!member) {
//             return res.status(400).json({ message: "User does not exist" });
//         }
//         res.status(200).json({ member });
//     }
//     catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { bulkUploadMembers } from "./members.js";
import Member from "../../models/member/memberModel.js";
import { sendPendingApprovalEmail } from "../../services/members/sendPendingApprovalEmail.js";

dotenv.config();

// Upload Dummy Members
export const uploadDummyMembers = async (req, res) => {
  try {
    const result = await bulkUploadMembers(Member);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: `Successfully uploaded ${result.count} members`,
        count: result.count,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to upload members",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Error in dummy member upload:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during member upload",
      error: error.message,
    });
  }
};

// Register Member
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const member = await Member.findOne({ email });
    if (member) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newMember = new Member({
      email,
      password: hashedPassword,
      profileStatus: "active",
    });

    await newMember.save();

    const jwtToken = jwt.sign(
      { id: newMember._id, role: "member" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "None", // Important for cross-origin
      maxAge: 3600000, // 1 hour
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Login Member
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (member.profileStatus === "pending" && !member.isVerified) {
      return res.status(400).json({ message: "Your profile is pending approval" });
    }

    if (member.profileStatus === "blocked" && !member.isVerified) {
      return res.status(400).json({ message: "Your profile is blocked" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, member.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const jwtToken = jwt.sign(
      { id: member._id, role: "member" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "None", // Important for cross-origin
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Logout Member
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

// Edit Profile
export const editProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      city,
      state,
      course,
      batch,
      admnNo,
      address,
      contact,
      githubProfile,
      linkedinProfile,
      skills,
      bio,
      instagramProfile,
      certifications,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const member = await Member.findOne({ email });

    if (!member) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Hash the new password if provided
    let hashedPassword = member.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    await Member.updateOne(
      { email },
      {
        name,
        email,
        password: hashedPassword,
        city,
        state,
        course,
        batch,
        admnNo,
        address,
        contact,
        githubProfile,
        linkedinProfile,
        bio,
        instagramProfile,
        $addToSet: {
          skills: { $each: skills || [] },
          certifications: { $each: certifications || [] },
        },
      }
    );

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error in editProfile:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
    console.log("Request body:", req.body);
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const member = await Member.findOne({ email }).select("-password");

    if (!member) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json({ success: true, member });
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};