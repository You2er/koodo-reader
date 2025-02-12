const initState = {
  mode: "home",
  shelfIndex: -1,
  isDragToLove: false,
  isDragToDelete: false,
};
export function sidebar(
  state = initState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "HANDLE_MODE":
      return {
        ...state,
        mode: action.payload,
      };
    case "HANDLE_SHELF_INDEX":
      return {
        ...state,
        shelfIndex: action.payload,
      };
    case "HANDLE_DRAG_TO_LOVE":
      return {
        ...state,
        isDragToLove: action.payload,
      };
    case "HANDLE_DRAG_TO_DELETE":
      return {
        ...state,
        isDragToDelete: action.payload,
      };
    default:
      return state;
  }
}
