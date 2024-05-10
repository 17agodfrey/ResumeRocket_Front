const api = (token) => {
    const baseUrl = "https://localhost:44392/api";

    const headers = {
      "Content-Type": "application/json",
    };
  
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    const get = (url) => (
        fetch(baseUrl + url, { method: "GET", headers, })
    );
  
    const post = (url, body) => {
    //   console.log("baseUrl", baseUrl)
    //   console.log("url", url);
    //   console.log("baseurl + url", baseUrl + url);
      return fetch(
        baseUrl + url,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers,
        }
      );
    };
    

    // const postMessage = (url, body) => (
    //   fetch(
    //     baseUrl + url,
    //     {
    //       method: "POST",
    //       body: JSON.stringify(body),
    //       headers,
    //     },
    //   )
    // );
  
    const postForm = (url, body) => (
      console.log(body),
      fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
      )
    );

    const postFileForm = (url, body, retries = 2, delay = 100) => {

      const cloneHeaders = JSON.parse(JSON.stringify(headers));
      
      delete cloneHeaders['Content-Type'] // = 'multipart/form-data'

      return fetch(baseUrl + url, {
            method: 'POST',
            body: body,
            headers: cloneHeaders
        }).then(res => {
          if (!res.ok) {  // Check if the response status code is not OK
              if (retries > 0) {
                  console.log(`Request failed, ${retries} retries remaining, retrying in ${delay} ms...`);
                  return new Promise(resolve => setTimeout(resolve, delay))
                      .then(() => postFileForm(url, options, retries - 1, delay));
              }
              throw new Error('No retries left');
            }
            return res;  // Return the successful response
          })
          .catch(error => {
              if (retries > 0) {
                  console.log(`Request failed due to ${error}, ${retries} retries remaining, retrying in ${delay} ms...`);
                  return new Promise(resolve => setTimeout(resolve, delay))
                      .then(() => postFileForm(url, options, retries - 1, delay));
              }
              throw error;  // Propagate the error if no retries left
          });
      };
  
    return { get, post, postForm, postFileForm };
  };
  
  export default api;
  
  