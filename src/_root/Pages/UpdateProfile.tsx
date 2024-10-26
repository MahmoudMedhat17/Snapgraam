import ProfileForm from "@/components/forms/ProfileForm";

const UpdateProfile = () => {
  return (
    <div className="common-container">
      <div className="flex items-center gap-4">
        <img src="/icons/edit.svg" width={36} height={36} className="invert-white"/>
        <h3 className="h2-bold md:h3-bold text-left w-full">Edit Profile</h3>
      </div>
      <div className="w-full h-full">
        <ProfileForm />
      </div>
    </div>
  );
};

export default UpdateProfile;
