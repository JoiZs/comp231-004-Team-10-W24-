// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sitter from "../components/Sitter";
// import { Link } from "react-router-dom";
// import { Grid, GridItem } from '@chakra-ui/react'

// const SitterList = () => {
//     const [sitters, setSitters] = useState([]);  
//     const fetchData = () => {
//       axios
//         .get("http://localhost:4000/profile")
//         .then((res) => {
//           if (Array.isArray(res.data)) {
//             setSitters(res.data);
//           } else {
//             console.error("Data received is not an array:", res.data);
//           }
//         })
//         .catch((err) => console.log(err));
//     };
//     useEffect(() => {
//       fetchData();
//     }, []); // Empty dependency array to mimic componentDidMount

//   const renderSitterList = () => {
//     const limitedSitters = sitters.slice(0, 5);

//     return (
//       <div>
//         {limitedSitters.map((sitter, i) => (
//           <Sitter
//             sitter={sitter}
//             key={i}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="sitterList">      
//       <section className="mb-5">{renderSitterList()}</section>
//      </div>
//   );
// };

// export default SitterList;