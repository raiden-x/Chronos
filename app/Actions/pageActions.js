import {
  LoadStoriesFromIds,
  LoadComments,
  LoadStory,
  LoadUserDetails
} from "../Apis/FirebaseApis";

const storiesPerPage = 30;

const ChangePage = (storyIds, page) => {
  const offSet = (page - 1) * storiesPerPage;
  const storiesToLoad = storyIds.slice(offSet, offSet + storiesPerPage);
  return dispatch => {
    LoadStoriesFromIds(offSet + 1, storiesToLoad).then(stories =>
      dispatch({
        type: "PAGE_CHANGED",
        data: {
          pageNo: page,
          storiesList: stories
        }
      })
    );
  };
};

const ClearStories = () => ({
  type: "CLEAR_STORIES"
});

const LoadStoryFromId = storyId => {
  return dispatch => {
    LoadStory(storyId).then(story => {
      LoadComments(story.kids).then(comments => {
        story.kids = comments;
        dispatch({
          type: "LOAD_STORY_WITH_COMMENTS",
          data: {
            story
          }
        });
      });
    });
  };
};

const LoadUserDetailsFromId = userId => {
  return (dispatch, store) => {
    LoadUserDetails(userId).then(data => {
      LoadStoriesFromIds(0, data.submitted.slice(0, 9)).then(stories => {
        data.submitted = stories;
        dispatch({
          type: "LOAD_USER_DATA",
          data: {
            userDetails: data
          }
        });
      });
    });
  };
};

const ClearCurrentStory = () => ({ type: "CLEAR_CURRENT_STORY" });

const ClearUserData = () => ({ type: "CLEAR_USER_DATA" });

export {
  ChangePage,
  ClearStories,
  LoadStoryFromId,
  ClearCurrentStory,
  LoadUserDetailsFromId,
  ClearUserData
};
