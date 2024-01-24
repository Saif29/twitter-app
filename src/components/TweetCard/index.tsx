import { ChangeEvent, useState } from "react";
import { getFullMonth } from "../../utils/helper";
import ActionButtons from "../ActionButtons";
import { EditTweet } from "../../utils/API";

interface CardProps {
  data: {
    id: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    content: string;
  };
  fetchAllTweets: () => Promise<void>;
}

interface FormData {
  author?: string;
  content?: string;
}

const RenderDate = (date: string, title?: string): JSX.Element => {
  const formattedDate = new Date(date);
  return (
    <p className="text-sm font-medium text-gray-400">
      {`${title ? `${title}: ` : ""}${formattedDate.getDate()} ${getFullMonth(
        formattedDate.getMonth()
      )} ${formattedDate.getFullYear()}, ${formattedDate.getHours()}:${formattedDate.getMinutes()}`}
    </p>
  );
};

const TweetCard: React.FC<CardProps> = ({ data, fetchAllTweets }) => {
  const [isEditing, setIsEditting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    author: data.author,
    content: data.content,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: e.target.value,
    }));
  };

  const handleEdit = async () => {
    await EditTweet(formData, data.id)
    await fetchAllTweets()
  }

  return (
    <div className="flex flex-col bg-white border shadow-sm my-5 rounded-xl p-4 md:p-5">
      <div className="flex-shrink-0 group block relative">
        <div className="flex items-center">
          <img
            className="inline-block flex-shrink-0 h-[3.875rem] w-[3.875rem] rounded-full"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="Image Description"
          />
          <div className="ms-3">
            {isEditing ? (
              <input
                value={formData.author}
                onChange={(e) => handleInputChange(e, "author")}
                type="text"
                className="py-1 px-5 block w-full bg-gray-200 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Name"
              />
            ) : (
              <h3 className="font-semibold text-gray-800">{data.author}</h3>
            )}
            <div className="flex gap-2 flex-col font-xs sm:font-sm sm:flex-row hidden md:flex">
              {RenderDate(data.createdAt, "Created At")}
              {RenderDate(data.updatedAt, "Updated At")}
            </div>
          </div>
        </div>
          <ActionButtons
          tweetId={data.id}
          fetchAllTweets={fetchAllTweets}
          isEditing={isEditing}
          setIsEditing={setIsEditting}
          handleEdit={handleEdit}
        />
        
      </div>

      {isEditing ? (
        <input
          value={formData.content}
          onChange={(e) => handleInputChange(e, "content")}
          type="text"
          className="mt-2 py-1 px-5 block w-full bg-gray-200 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          placeholder="Tweet"
        />
      ) : (
        <>
        <p className="mt-2 text-gray-500">{data.content}</p>
        
        <div className="flex mt-4 gap-2 flex-col font-xs sm:font-sm sm:flex-row md:hidden">
              {RenderDate(data.createdAt, "Created At")}
              {RenderDate(data.updatedAt, "Updated At")}
            </div>
        </>
      )}
    </div>
  );
};

export default TweetCard;
