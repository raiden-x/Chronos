const TabReducer = (store = { tab: "TOP", storyIds: [], totalPages: 1 }, action) => {
  switch (action.type) {
    case "TAB_SWITCH":
      return {
        ...store,
        tab: action.data.tab,
        storyIds: action.data.storyIds,
        totalPages: action.data.totalPages
      };
    default:
      return store;
  }
};

export default TabReducer;
