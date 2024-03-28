import { useState, useEffect} from "react";
import axios from "axios";
import {
  Text,
  Heading,
  Badge,
  Avatar,
  VStack,  
} from "@chakra-ui/react";
import EditProfile from "./myProfileEdit";

export default function Profile() {   
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/profile/me", {
          withCredentials: true
        });
        setProfileData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Error: Unable to fetch profile data</div>;
  }

  return (
    <div>
      <Heading as="h2" size="lg" mb={5}>
        My Profile
      </Heading>
      <Avatar
        size={"lg"}
        src={profileData?.Profile?.img}
        name={profileData?.firstname + " " + profileData?.lastname}
      />
      <VStack alignItems={"flex-start"} py={2}>
        <Badge>Fristname</Badge>
        <Text>{profileData.firstname}</Text>
        <Badge>Lastname</Badge>
        <Text>{profileData.lastname}</Text>
        <Badge>Email</Badge>
        <Text>{profileData.email}</Text>
        <Badge>Address</Badge>
        <Text>{`${profileData?.address?.street},
                ${profileData?.address?.suburb},
                ${profileData?.address?.city}
                ${profileData?.address?.postalCode},
                ${profileData?.address?.province}`}
        </Text>
      </VStack>
      <EditProfile />
    </div>
  );
}