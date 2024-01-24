import axios from "axios"

export const fetchTweets = async () => {
    try {
        const response = await axios.get('https://test-twitter-api.lixium.dev/tweets')
        return response.data
    }
    catch(err) {
        console.log('error in api/fetchTweets')
    }
}

export const PostTweet = async (data:object) => {
    try {
        const response = await axios.post('https://test-twitter-api.lixium.dev/tweets', data)
        return response.data
    }
    catch(err) {
        console.log('error in api/postTweet')
    }
}

export const EditTweet = async (data:object, id:string) => {
    try {
        const response = await axios.patch(`https://test-twitter-api.lixium.dev/tweets/${id}`, data)
        return response.data
    }
    catch(err) {
        console.log('error in api/editTweet')
    }
}

export const DeleteTweet = async (id:string) => {
    try {
        const response = await axios.delete(`https://test-twitter-api.lixium.dev/tweets/${id}`)
        return response.data
    }
    catch(err) {
        console.log('error in api/deleteTweet')
    }
}

export const getSingleTweet = async (id?:string) => {
    try {
        const response = await axios.get(`https://test-twitter-api.lixium.dev/tweets/${id}`)
        return response.data
    }
    catch(err) {
        console.log('error in api/getSingleTweet')
    }
}