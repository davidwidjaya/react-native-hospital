import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ToastAndroid } from "react-native"
import { omit } from "ramda"
import { Api } from "@services/api"



const ApiInstance = new Api();
ApiInstance.setup();

const actionError = (res, model) => {

  if (res.msg == "Unable to authenticate with invalid API key and token.") {
    model.removeCurrentUser();

    ToastAndroid.show("Your session has been expired. Please try to login again.", ToastAndroid.LONG);
  } else {
    var msg = "";
    if (Array.isArray(res.msg) && res.msg.length > 0) {
      res.msg.map((item, i) => {
        msg += item + "\n";
      });
    } else {
      msg = res.msg;
    }

    ToastAndroid.show("Connection to server failed. Try again later.", ToastAndroid.LONG);
  }

}


/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
})

  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    async login(content) {
      var res = await ApiInstance.login(content);
      console.log(res);
      if (res.kind == "ok") {
      }
      else if (res.kind == 'wrong') {
        console.log(res.message);
      }
      else {
        actionError(res, self);
      }
      return res;
    },
    async dashboard(content) {
      var res = await ApiInstance.dashboard(content);
      console.log('result apistore-dashboard: ', res);
      if (res.kind == "ok") {
      }
      else if (res.kind == 'wrong') {
        console.log(res.message);
      }
      else {
        actionError(res, self);
      }
      return res;
    },
    async listFaskes(content) {
      var res = await ApiInstance.listFaskes(content);
      console.log('result apistore-listFaskes: ', res);
      if (res.kind == "ok") {
      }
      else if (res.kind == 'wrong') {
        console.log(res.message);
      }
      else {
        actionError(res, self);
      }
      return res;
    },
    async getNavbar(content) {
      var res = await ApiInstance.getNavbar(content);
      console.log('result apistore-getNavbar: ', res);
      if (res.kind == "ok") {
      }
      else if (res.kind == 'wrong') {
        console.log(res.message);
      }
      else {
        actionError(res, self);
      }
      return res;
    }
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
