const apiList = {
  // Authentication APIs
  register: {
    url: () => "auth/register",
    method: "post",
  },
  login: {
    url: () => "auth/login",
    method: "post",
  },

  // Posts APIs
  createPost: {
    url: () => "post/add",
    method: "post",
  },
  fetchPost:{
    url:()=>"post/findAll",
    method:"post"
  },

  // createComment
  createComment:{
    url:()=>"comment/add",
    method:"post"
  },

  // upload file 
    upload:{
      url:()=>"upload",
      method:"post"
    },
    likeDislike:{
      url: () => `post`,
      method:"post"
    },

    // User
    updateUser:{
      url:(id)=>`user/${id}`,
      method:"put"
    },
    // Post
    deletePost:{
      url:(id)=>`post/${id}`,
      method:"delete"
    },

    // Friends and suggestions
    suggestions:{
      url:()=>"user/suggestions",
      method:"post"
    },
    followFriend:{
      url:()=>"user/followFriend",
      method:"post"
    }
};
export default apiList;