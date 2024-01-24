import React from "react";
import ModalComponent from "../ModalComponent";

interface PostProps {
  fetchAllTweets: () => Promise<void>;
}

const PostTweetComponent: React.FC<PostProps> = ({fetchAllTweets}) => {
  return (
    <div className="flex justify-end sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full py-4">
        <button
          type="button"
          className="w-[100%] sm:w-[300px] py-3 justify-center inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          data-hs-overlay="#hs-basic-modal"
        >
          Post Tweet
        </button>
      <ModalComponent modalId={'hs-basic-modal'} fetchAllTweets={fetchAllTweets} />
    </div>
  );
};

export default PostTweetComponent;
