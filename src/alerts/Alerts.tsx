import { toast } from "react-toastify";

export function errUserNotify() {
      toast.error("Login Faild UserEmail Not Existing")
}
export function errPasswordAlt() {
    toast.error("Login Faild Password Not Match")
}
export function sucessfull() {
    toast.success("Login successfully")
}
export function registerSucessfull() {
    toast.success("Register successfully")
}
export function userExistingError() {
    toast.error("User already existing")
}
export function invalidForgotEmail() {
    toast.error("Invalid Email Adddress")
}
export function sendOtpCode() {
    toast.success("OTP Code Send Successfully")
}
export function otpVerificationFaild() {
    toast.error("Invalid Otp code")
}
export function otpVerificationSuccess() {
    toast.success("OTP verification Successfully")
}

export function passwordNotMatch() {
    toast.error("Password not match!")
}
export function userDetailsUpload() {
    toast.success("User data upload Successfully")
}
export function oldPasswordMismatch() {
    toast.error("Please Check Your Old Password")
}
export function placeDataSuccessfullUpload() {
    toast.success("Data Upload Successfully")
}
export function placeDataError() {
    toast.error("oops! Some Error Occured")
}
export function logOutSuccessfully() {
    toast.success("Logout")
}
export function placeDeleteSuccessfully() {
    toast.success("Deleted Successfully")
}
export function orderDeleteSuccessfully() {
    toast.success("Order Deleted Successfully")
}
export function accepted() {
    toast.success("Accepted Successfully")
}
export function declide() {
    toast.success("Declide Successfully")
}
export function bookingSuccessfully() {
    toast.success("Booking Successfully")
}
export function missingValues() {
    toast.error("Please Fill All Details")
}