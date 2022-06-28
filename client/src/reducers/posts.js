//Reducer = a function that accepts a state and an action
//Based on the action type do somthing, kinda like a switch statement
//This document exports two different reducer cases, "FETCH_ALL" and "CREATE" both will have an action and payload associated with them

//the state will always be posts because this is the post reducer,  thus we replace state with posts
//the state needs to be set equal to somthing else, in this case we set it to an empty array
export default (posts = [], action) => {
  switch (action.type) {
    case "DELETE":
      //returns an array of posts that share an _id with the payload
      return posts.filter((post) => post._id !== action.payload);
    case "UPDATE":
    case "LIKE_POST":
      //output of map() is an array
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    default:
      return posts;
  }
};
