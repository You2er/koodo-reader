import localforage from "localforage";
import OtherUtil from "../../utils/otherUtil";
import BookModel from "../../model/Book";
import BookmarkModel from "../../model/Bookmark";
import NoteModel from "../../model/Note";
import { Dispatch } from "redux";
import AddTrash from "../../utils/addTrash";

declare var window: any;

export function handleNotes(notes: NoteModel[]) {
  return { type: "HANDLE_NOTES", payload: notes };
}
export function handleBooks(books: BookModel[]) {
  return { type: "HANDLE_BOOKS", payload: books };
}
export function handleDeletedBooks(deletedBooks: BookModel[]) {
  return { type: "HANDLE_DELETED_BOOKS", payload: deletedBooks };
}
export function handleSearchResults(searchResults: number[]) {
  return { type: "HANDLE_SEARCH_BOOKS", payload: searchResults };
}
export function handleSearch(isSearch: boolean) {
  return { type: "HANDLE_SEARCH", payload: isSearch };
}
export function handleSetting(isSettingOpen: boolean) {
  return { type: "HANDLE_SETTING", payload: isSettingOpen };
}
export function handleList(mode: string) {
  return { type: "HANDLE_LIST", payload: mode };
}
export function handleMessage(message: string) {
  return { type: "HANDLE_MESSAGE", payload: message };
}
export function handleMessageBox(isShow: boolean) {
  return { type: "HANDLE_MESSAGE_BOX", payload: isShow };
}
export function handleSortDisplay(isSortDisplay: boolean) {
  return { type: "HANDLE_SORT_DISPLAY", payload: isSortDisplay };
}
export function handleSort(isSort: boolean) {
  return { type: "HANDLE_SORT", payload: isSort };
}
export function handleFirst(isFirst: string) {
  return { type: "HANDLE_FIRST", payload: isFirst };
}
export function handleSortCode(sortCode: { sort: number; order: number }) {
  return { type: "HANDLE_SORT_CODE", payload: sortCode };
}

export function handleBookmarks(bookmarks: BookmarkModel[]) {
  return { type: "HANDLE_BOOKMARKS", payload: bookmarks };
}
export function handleFetchBooks(isTrash = false) {
  return (dispatch: Dispatch) => {
    localforage.getItem("books", async (err, value) => {
      let bookArr: any = value;
      let keyArr = AddTrash.getAllTrash();
      if (isTrash) {
        dispatch(handleDeletedBooks(handleKeyFilter(bookArr, keyArr)));
      } else {
        dispatch(handleBooks(handleKeyRemove(bookArr, keyArr)));
      }
    });
  };
}
export function handleFetchSortCode() {
  return (dispatch: Dispatch) => {
    let sortCode = OtherUtil.getSortCode();
    dispatch(handleSortCode(sortCode));
  };
}
export function handleFetchList() {
  return (dispatch: Dispatch) => {
    let isList = OtherUtil.getReaderConfig("isList") || "card";
    dispatch(handleList(isList));
  };
}
const handleKeyRemove = (items: any[], arr: string[]) => {
  if (!items) return [];
  let itemArr: any[] = [];
  if (!arr[0]) {
    return items;
  }
  for (let i = 0; i < items.length; i++) {
    if (arr.indexOf(items[i].key) === -1) {
      itemArr.push(items[i]);
    }
  }
  return itemArr;
};
const handleKeyFilter = (items: any[], arr: string[]) => {
  if (!items) {
    return [];
  }
  let itemArr: any[] = [];
  for (let i = 0; i < items.length; i++) {
    if (arr.indexOf(items[i].key) > -1) {
      itemArr.push(items[i]);
    }
  }
  return itemArr;
};
