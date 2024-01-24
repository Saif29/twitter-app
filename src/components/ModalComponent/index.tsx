import React, { ChangeEvent, useState } from "react";
import { PostTweet } from "../../utils/API";
import { toast } from "react-toastify";

interface FormData {
  author?: string;
  content?: string;
}

interface ModalComponentProps {
  tweetId?: string;
  modalId: string;
  fetchAllTweets: () => Promise<void>;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  modalId,
  fetchAllTweets,
}) => {
  const [formData, setFormData] = useState<FormData>({});

  const handleTweetPost = async () => {
    await PostTweet(formData);
    toast("Tweet Posted Successfully");
    setFormData({});
    await fetchAllTweets();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: e.target.value,
    }));
  };

  return (
    <div
      id={modalId}
      className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden w-full h-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    >
      <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3 className="font-bold text-gray-800">Tweet</h3>
            <button
              type="button"
              className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-overlay={`#${modalId}`}
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <input
              value={formData.author}
              onChange={(e) => handleInputChange(e, "author")}
              type="text"
              className="py-3 px-5 block w-full bg-gray-200 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder="Name"
            />
          </div>
          <div className="p-4 overflow-y-auto">
            <input
              value={formData.content}
              onChange={(e) => handleInputChange(e, "content")}
              type="text"
              className="py-3 px-5 block w-full bg-gray-200 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder="Message"
            />
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
              onClick={() => handleTweetPost()}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-overlay={`#${modalId}`}
              disabled={!(formData.author && formData.content)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
