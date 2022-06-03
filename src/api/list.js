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
    }
};
export default apiList;
