import { useEffect, useState } from "react";
import { oldPasswordMismatch, passwordNotMatch, userDetailsUpload } from "../../../alerts/Alerts";
import { ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import axios from "axios";
import profilePic from "../../../assets/Logo/diyadahara.png";
export default function Bprofile() {

  const [oldPassword, setOldPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<String>("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [oldErrPassowrd, setErrOldPassword] = useState<boolean>(false);
  const [passwordErr, setErrPassword] = useState<boolean>(false);
  const [cPasswordErr, setErrCPassword] = useState<boolean>(false);


  const getSessionData = () => {
    const email = sessionStorage.getItem("Email");
    const id = sessionStorage.getItem("Id");
    const name = sessionStorage.getItem("Name");
    return [email, id, name];
  };

  useEffect(() => {
    const phone = sessionStorage.getItem("Email");
    if (phone) {
      setPhoneNumber(phone);
    }
    console.log(phoneNumber);
    
  })
  const updateUserDetails = async () => {
    if (oldPassword || password || cPassword) {
      if (password === cPassword) {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/com-hidden-srilanka/update-user-password-by-email',
            null,
            {
              params: {
                email: getSessionData()[0],
                oldPassword: oldPassword,
                newPassword: password
              }
            }
          );

          if (response.data) {
            console.log(response.data);
            if (response.data.message == "Password Update Successfully") {
              userDetailsUpload();
            }
            if (response.data.message == "Old Password Doesn't Match") {
              oldPasswordMismatch();
              setErrOldPassword(true);
            }
          }
        } catch (error) {
          console.error('Upload error:', error);
        } finally {
          console.log('UserDetails Update function called finished');
        }
      } else {
        passwordNotMatch();
        setErrCPassword(true);
        setErrPassword(true);
      }
    } else {
      setErrOldPassword(true);
      setErrCPassword(true);
      setErrPassword(true);
    }
  }
  return (
    <div>
      <ToastContainer />
      <div className="mx-auto w-[95%] mt-[20px]">
        <h2 className="font-serif text-[1.5em]">My Profile</h2>
      </div>
      <div>
        <div className="profile_main_wrapper  w-[95%] h-[75vh] mt-[10px] mx-auto">
          <div className=" bg-white h-[95%] overflow-y-auto rounded-[10px] w-[100%] md:flex">
            <div className="w-[100%] border-r-2 px-[20px]">
              <div>
                 <div className="flex justify-center">
                  <div className="border-green-500 border-4 h-[7em] rounded-[100px] p-[3px] mt-[2em] flex">
                    <img className="w-[100%] rounded-[100px]" src={profilePic} alt="" />
                  </div>
                </div>
                <p className="text-center font-semibold text-[1.2rem]">Diyadahara Resort</p>
                <div className="flex justify-center gap-1 text-center text-gray-400 text-[1.1rem]">
                  <p>Kuruneagala</p>
                  <p>|</p>
                  <p>2026/203608IME</p>
                </div>
                <div>
                  <div className="mt-[10px] bg-green-200 py-[12px] px-[10px]">
                    <p className="font-serif text-gray-700">Profile Information</p>
                  </div>
                  <div className="mt-[10px] bg-gray-100 py-[12px] px-[10px]">
                    <p className="font-serif text-gray-700">Booking History</p>
                  </div>
                  <div className="mt-[10px] bg-gray-100 py-[12px] px-[10px]">
                    <p className="font-serif text-gray-700">Newsletter Subscription</p>
                  </div>
                  <div className="mt-[10px] bg-gray-100 py-[12px] px-[10px]">
                    <p className="font-serif text-gray-700">Mange Notfication</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[70%] p-[10px] overflow-auto">
              <div>
                <h2 className="font-serif text-[1.3em] text-gray-400 mb-[10px]">Security</h2>
                <div className="mb-[5px]">
                  <p className="font-serif mb-[5px]">Email:</p>
                  <TextField disabled value={getSessionData()[0]} size="small" sx={{ width: "90%", backgroundColor: "#f0f0f0", border: "none" }} color="success" label="User Email" variant="outlined" />
                </div>
                <div className="mb-[5px]">
                  <p className="font-serif mb-[5px]">Old Password:</p>
                  <TextField error={oldErrPassowrd} onChange={(e) => { setOldPassword(e.target.value) }} size="small" sx={{ width: "90%", backgroundColor: "#f0f0f0", border: "none" }} color="success" label="Old Password" variant="outlined" />
                </div>
                <div className="mb-[5px]">
                  <p className="font-serif mb-[5px]">New Password:</p>
                  <TextField error={passwordErr} onChange={(e) => { setPassword(e.target.value) }} size="small" sx={{ width: "90%", backgroundColor: "#f0f0f0", border: "none" }} color="success" label="New Password" variant="outlined" />
                </div>
                <div className="mb-[5px]">
                  <p className="font-serif mb-[5px]">Confirm Password:</p>
                  <TextField error={cPasswordErr} onChange={(e) => { setCPassword(e.target.value) }} size="small" sx={{ width: "90%", backgroundColor: "#f0f0f0", border: "none" }} color="success" label="Confirm Password" variant="outlined" />
                </div>
                <div className="mt-[10px]">
                  <button onClick={() => { updateUserDetails() }} className="p-[10px] bg-green-400 w-[30%] text-white rounded-[5px]">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
