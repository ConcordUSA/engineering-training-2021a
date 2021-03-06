import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { User } from "../models/user";
import { IEvent } from "../models/event";

export default class UsersService {
  private collection = "users";

  constructor(
    private db: firebase.firestore.Firestore,
    private auth?: firebase.auth.Auth
  ) {}

  public createUser = async (user: User) => {
    if (!user.password) return { error: "No password provided" };
    // create user in auth service
    let uid: string | undefined;

    try {
      const userCredential = await this.auth?.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      uid = userCredential?.user?.uid;
    } catch (error) {
      return { error: error.message };
    }

    // create user in db service
    const data = { ...user, uid };
    delete data.password;

    try {
      await this.db.collection(this.collection).doc(uid).set(data);
      return { uid, message: "User successfully created" };
    } catch (error) {
      return { error: error.message };
    }
  };

  public async watchUser(uid: string, callback: Function) {
    return await this.db
      .collection(this.collection)
      .doc(uid)
      .onSnapshot((snapShot) => {
        const data = snapShot.data() as User;
        callback(data);
      });
  }

  public async getUser(uid: string) {
    const doc = await this.db.collection(this.collection).doc(uid).get();
    const data = doc.data() as User;

    return data;
  }

  public async updateUser(uid: string, data: Object) {
    try {
      await this.db
        .collection(this.collection)
        .doc(uid)
        .set({ ...data }, { merge: true });
      return { uid, message: "User successfully updated" };
    } catch (error) {
      return { error: error.message };
    }
  }

  public async registerForEvent(
    user: User,
    event: IEvent,
    isRegistered: boolean
  ) {
    let newAttendingList;
    if (!isRegistered) {
      newAttendingList = user.eventsAttending.concat(event.id);
    } else {
      newAttendingList = this.removeItem(user.eventsAttending, event.id);
    }
    this.updateUser(user.uid, { ...user, eventsAttending: newAttendingList });
    return { ...user, eventsAttending: newAttendingList };
  }

  public removeItem(arr, rm) {
    const retArr = [];
    arr.forEach((id) => {
      if (!(id === rm)) {
        retArr.push(id);
      }
    });
    return retArr;
  }
}
