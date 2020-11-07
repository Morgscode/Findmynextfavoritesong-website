class SpotifyApiInterface {
  constructor(token) {
    this.token = token;
  }

  setSpotifyFetchOptions() {
    const fetchOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token.toString()}`,
      },
    };
    return fetchOptions;
  }

  async spotifyGetFetchRequest(url) {
    const options = this.setSpotifyFetchOptions();

    let response = await fetch(url, options)
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          return (response.error = 1);
        }
      })
      // let's handle the error appropriately
      .catch((err) => {
        return (response.error = err.message);
      });
    return response;
  }

  async spotifyPutFetchRequest(url) {
    let options = this.setSpotifyFetchOptions();
    options.method = "PUT";
    const response = await fetch(url, options)
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          return (response.error = 1);
        }
      })
      // let's handle the error appropriately
      .catch((err) => {
        return (response.error = err.message);
      });
    return response;
  }
}

module.exports = SpotifyApiInterface;
