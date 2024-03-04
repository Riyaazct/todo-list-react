import { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import NewTask from "../components/NewTask";
import Tasks from "../components/Tasks";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        // CODE
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="max-w-[90%] xl:max-w-[1200px] m-auto">
      {!content && (
        <div>
          <NewTask />
          <Tasks />
        </div>
      )}

      {content && (
        <div className="flex items-center justify-center h-[80vh] text-5xl">
          Restricted access, Please Log in or Register!
        </div>
      )}
    </div>
  );
};

export default BoardUser;
