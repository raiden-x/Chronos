import React, { useEffect } from "react";
import UserInfoCard from "./UserInfoCard";
import { connect } from "react-redux";
import { LoadUserDetailsFromId } from "../Actions/pageActions";
import UserItems from "./UserItems";

const mapStateToProps = ({ page: { userData } }, { dispatch }) => {
  return { userData, dispatch };
};
const userPage = ({ userData, dispatch }) => {
  useEffect(() => {
    let params = new URL(document.location).searchParams;
    let userId = params.get("userId");
    dispatch(LoadUserDetailsFromId(userId));
  }, []);
  return (
    <div id={"user-page"}>
      {userData && (
        <>
          <div id={"user-left-panel"}></div>
          <div id={"user-middle-panel"}>
            <UserItems userItems={userData.submitted} userId={userData.id} />
          </div>
          <div id={"user-right-panel"}>
            <div id={"user-card"}>
              <UserInfoCard userData={userData}></UserInfoCard>
            </div>
          </div>
        </>
      )}
      {!userData && <div>Loading...</div>}
    </div>
  );
};

export default connect(mapStateToProps)(userPage);
