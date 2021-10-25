import { combineReducers } from "@reduxjs/toolkit";
import ui from "./ui";
import entities from "./entities";

export default combineReducers({
  ui,
  entities,
});
