import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext/UserContext";
import no_profile from "../../assets/media/no-profile.jpg";
import { BiLoaderAlt } from "react-icons/bi";

const ProfileComponent = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.username) {
      setLoading(false);
    }
  }, [user]);

  return loading ? (
    <div className="col-12 color-custom2 d-flex justify-content-center my-2">
      <BiLoaderAlt className="profile-loader" />
    </div>
  ) : (
    <div className="row">
      <div className="col-12 col-md-4 p-2">
        <div className="profile_picture_container rounded-pill p-4 col-7 col-md-12 mx-auto">
          <div
            style={{
              backgroundImage: `url(${
                user.profile ? user.profile : no_profile
              }`,
            }}
            className="profile_picture rounded-pill"
          ></div>
        </div>
      </div>
      <div className="col-12 col-md-8 p-4 color-custom1">
        <p className="profile_info ml-4">
          <span className="color-custom2">First name: </span>
          {user.f_name}
        </p>
        <p className="profile_info ml-4">
          <span className="color-custom2">Last name: </span>
          {user.l_name}
        </p>
        <p className="profile_info ml-4">
          <span className="color-custom2">Username: </span>
          {user.username}
        </p>
        <p className="profile_info ml-4">
          <span className="color-custom2">Email: </span>
          {user.email}
        </p>
        <p className="profile_info ml-4">
          <span className="color-custom2">Role: </span>
          {user.role?.name}
        </p>
        <p className="profile_info ml-4">
          <span className="color-custom2">Created: </span>
          {user.created}
        </p>
      </div>
    </div>
  );
};

export default ProfileComponent;
