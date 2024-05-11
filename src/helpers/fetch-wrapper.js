/// <summary>
/// File Name : fetchWrapper.js
/// Created By : 
/// Purpose :   Handling the response in  different methods
/// </summary>
/// <returns></returns>
export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
  
  };
  // get method used to get the  response
  async function get(url) {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  }
  //the method is set to post , to  request fetch api using url
  async function post(url, body) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  }
  //the method is set to “PUT”, and the body of the request is a JSON stringified
  async function put(url, body) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  }
  
  // prefixed with underscored because delete is a reserved word in javascript
  async function _delete(url) {
    const requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  }
  
  // helper functions to get the reponse and parse to json
  
  function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
  
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }

  