import React from "react";
import { View } from "react-native";
import ProfileDisplay from "../components/Profile/ProfileDisplay";
import ProfileEditForm from "../components/Profile/ProfileEditForm";
import { useEditProfile } from "../hooks/useEditProfile";

export default function EditProfile() {
  const {
    currentName,
    currentEmail,
    currentMobile,
    editable,
    phoneNumber,
    uname,
    email,
    gender,
    handleEnableEdit,
    saveDetails,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleGenderChange,
  } = useEditProfile();

  if (!editable) {
    return (
      <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
        <ProfileDisplay
          name={currentName}
          gender={gender}
          mobile={currentMobile}
          email={currentEmail}
          onEdit={handleEnableEdit}
        />
      </View>
    );
  }

  return (
    <ProfileEditForm
      name={uname}
      gender={gender}
      phoneNumber={phoneNumber}
      email={email}
      onNameChange={handleNameChange}
      onGenderChange={handleGenderChange}
      onPhoneChange={handlePhoneChange}
      onEmailChange={handleEmailChange}
      onSave={saveDetails}
    />
  );
}
