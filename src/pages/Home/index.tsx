import { ToastContainer } from "react-toastify";
import PostTweetComponent from "../../components/PostTweet";
import Skeleton from "../../components/Skeleton";
import TweetCard from "../../components/TweetCard";
import { useEffect, useState } from "react";
import { fetchTweets } from "../../utils/API";

interface Tweet {
  id: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

const Home = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllTweets = async () => {
    setLoading(true);
    const res = await fetchTweets();
    setTweets(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllTweets();
  }, []);
  return (
    <div className="container">
      <PostTweetComponent fetchAllTweets={fetchAllTweets} />
      <>
        {loading ? (
          <Skeleton count={2} />
        ) : (
          <>
            {tweets.map((tweet, index) => {
              return (
                <TweetCard
                  key={index}
                  data={tweet}
                  fetchAllTweets={fetchAllTweets}
                />
              );
            })}
          </>
        )}
      </>
      <ToastContainer />
    </div>
  );
};

export default Home;
