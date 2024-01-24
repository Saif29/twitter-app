import React from "react";
import { DeleteTweet } from "../../utils/API";
import { toast } from "react-toastify";

interface ActionButtonsProps {
  tweetId: string;
  fetchAllTweets: () => Promise<void>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: () => Promise<void>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  tweetId,
  fetchAllTweets,
  isEditing,
  setIsEditing,
  handleEdit,
}) => {
  const handleDelete = async () => {
    await DeleteTweet(tweetId);
    toast("Tweet Deleted!");
    await fetchAllTweets();
  };

  const handleEditClick = () => {
    if (isEditing) {
      handleEdit()
      toast("Tweet Updated Successfully!")
      setIsEditing(false)
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="absolute top-0 right-2 flex gap-2">
      <img
        onClick={() => handleEditClick()}
        width={20}
        height={20}
        style={{ cursor: "pointer" }}
        alt="edit"
        src={
          isEditing
            ? "https://png.pngtree.com/element_our/20200702/ourmid/pngtree-tick-icon-design-png-image_2292822.jpg"
            : "https://www.svgrepo.com/show/75500/edit-button.svg"
        }
      />

      <img
        onClick={handleDelete}
        width={20}
        height={20}
        style={{ cursor: "pointer" }}
        alt="delete"
        src="https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/33-512.png"
      />
    </div>
  );
};

export default ActionButtons;
