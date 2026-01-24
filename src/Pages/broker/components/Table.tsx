// import React, { useState } from "react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
// } from "@mui/material";
// import CustomeDrawer from "./Drawer";

// interface Customer {
//     customerID: number;
//     customerName: string;
//     customerEmail: string;
//     phoneNumber: string;
//     status: string;
//     joinDate: string;
// }

// const CustomerTable: React.FC = () => {
//     const [rows, setRows] = useState<Customer[]>([
//         {
//             customerID: 1,
//             customerName: "Senarath",
//             customerEmail: "sandeepa1@gmail.com",
//             phoneNumber: "0771234598",
//             status: "Active",
//             joinDate: "2026-01-20",
//         },
//         {
//             customerID: 2,
//             customerName: "Kamal",
//             customerEmail: "kamal@gmail.com",
//             phoneNumber: "0779876543",
//             status: "Inactive",
//             joinDate: "2025-12-15",
//         },
//         {
//             customerID: 3,
//             customerName: "Kamal",
//             customerEmail: "kamal@gmail.com",
//             phoneNumber: "0779876543",
//             status: "Inactive",
//             joinDate: "2025-12-15",
//         },
//         {
//             customerID: 4,
//             customerName: "Kamal",
//             customerEmail: "kamal@gmail.com",
//             phoneNumber: "0779876543",
//             status: "Inactive",
//             joinDate: "2025-12-15",
//         }
//     ]);

//     // Delete function
//     const handleDelete = (id: number) => {
//         setRows((prevRows) => prevRows.filter((row) => row.customerID !== id));
//     };

//     return (
//         <TableContainer sx={{ maxHeight: 270 }} component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell sx={{ width: '10%' }} align="center">Customer ID</TableCell>
//                         <TableCell align="center">Customer Name</TableCell>
//                         <TableCell align="center">Customer Email</TableCell>
//                         <TableCell align="center">Phone Number</TableCell>
//                         <TableCell align="center">Status</TableCell>
//                         <TableCell align="center">Join Date</TableCell>
//                         <TableCell align="center">Action</TableCell>
//                     </TableRow>
//                 </TableHead>

//                 <TableBody>
//                     {rows.map((row) => (
//                         <TableRow key={row.customerID} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
//                             <TableCell component="th" scope="row">{row.customerID}</TableCell>
//                             <TableCell align="left">{row.customerName}</TableCell>
//                             <TableCell align="left">{row.customerEmail}</TableCell>
//                             <TableCell align="left">{row.phoneNumber}</TableCell>
//                             <TableCell align="left"
//                                 // sx={{
//                                 //     color: "white",
//                                 //     fontWeight: "bold",
//                                 //     textAlign: "center",
//                                 //     borderRadius: 15,
//                                 //     backgroundColor:
//                                 //         row.status === "Active"
//                                 //             ? "#28a745" // green
//                                 //             : row.status === "Inactive"
//                                 //                 ? "#dc3545" // red
//                                 //                 : "#6c757d", // gray for others
//                                 // }}
//                             >{row.status}</TableCell>
//                             <TableCell align="left">{row.joinDate}</TableCell>
//                             <TableCell align="left">
//                                 <div className="flex gap-1">
//                                     <Button variant="contained" color="error" size="small" onClick={() => handleDelete(row.customerID)}>Delete</Button>
//                                     <Button variant="contained" color="info" size="small" onClick={() => handleDelete(row.customerID)}>Edit</Button>
//                                 <CustomeDrawer/>
//                                 </div>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// export default CustomerTable;
