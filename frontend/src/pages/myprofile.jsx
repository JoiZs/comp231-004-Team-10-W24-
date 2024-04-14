import { useState, useEffect } from "react";
import axios from "axios";
import { Text, Heading, Badge, Avatar, VStack } from "@chakra-ui/react";
import EditProfile from "./myProfileEdit";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get("http://localhost:4000/profile/me", {
        withCredentials: true,
      });
=======
      const response = await axios.get(
        import.meta.env.VITE_SERV_URL + "/profile/me",
        {
          withCredentials: true,
        }
      );
>>>>>>> b2d7069 (build(docker): dockerize the app)
      setProfileData(response.data.data);
      setIsLoading(false);
      console.log("Pet types:", response.data.data.Profile.petType); // Logs the pet types
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Error: Unable to fetch profile data</div>;
  }

  console.log(profileData);

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
        <Badge>Firstname</Badge>
        <Text>{profileData.firstname}</Text>
        <Badge>Lastname</Badge>
        <Text>{profileData.lastname}</Text>
        <Badge>Email</Badge>
        <Text>{profileData.email}</Text>
        <Badge>Address</Badge>
        <Text>
          {`${profileData?.address?.street},
                ${profileData?.address?.suburb},
                ${profileData?.address?.city}
                ${profileData?.address?.postalCode},
                ${profileData?.address?.province}`}
        </Text>
        <Badge>Pet Type</Badge>
        <Text>
          {profileData.Profile.petType && profileData.Profile.petType.length > 0
            ? profileData.Profile.petType.join(", ")
            : "Not specified"}
        </Text>
        {profileData?.Profile?.profileType === "Sitter" && (
          <>
            <Badge>Available Slots</Badge>
            <Text>{profileData?.Profile?.availabilitySlot}</Text>
            <div className="flex flex-row flex-wrap justify-between w-full">
              <div>
                <Badge>Availablility Start Date</Badge>
                <Text>
                  {new Date(
                    profileData?.Profile?.availabilityStart
                  ).toDateString()}
                </Text>
              </div>
              <div>
                <Badge>Availablility End Date</Badge>
                <Text>
                  {new Date(
                    profileData?.Profile?.availabilityEnd
                  ).toDateString()}
                </Text>
              </div>
            </div>
          </>
        )}
      </VStack>
      <EditProfile onUpdate={fetchProfileData} />
    </div>
  );
}
