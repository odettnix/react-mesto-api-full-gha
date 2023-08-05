class Api {
  constructor( {baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;

    this.__checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + `/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      } 
    }).then(this.__checkResponse);
  }

  getInitialCards() {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + `/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }  
    })
    .then(this.__checkResponse);
  }

  saveNewUserInfo(userInformaiton) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(userInformaiton)
    })
      .then(this.__checkResponse);
  }

  saveNewUserAvatar(avatar) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(avatar)})
      .then(this.__checkResponse);
  }

  postNewCard(cardInformation) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(cardInformation)})
      .then(this.__checkResponse);
  }

  removeCard(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
      })
      .then(this.__checkResponse);
  }

  putLikeCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      })
      .then(this.__checkResponse);
  }

  deleteLike(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
      })
      .then(this.__checkResponse);
  }
}

export const api = new Api({
    baseUrl: 'https://api.odettnix.nomorepartie.nomoreparties.co',
    // baseUrl: 'http://localhost:3000',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
});

// class Api {
//   constructor( {baseUrl, headers}) {
//     this._baseUrl = baseUrl;
//     this._headers = headers;

//     this.__checkResponse = (res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     };
//   }

//   getUserInfo() {
//     return fetch(this._baseUrl + `/users/me`, {
//       method: "GET",
//       headers: this._headers,
//     }).then(this.__checkResponse);
//   }

//   getInitialCards() {
//     return fetch(this._baseUrl + `/cards`, {
//       method: 'Get',
//       headers: this._headers, })
//     .then(this.__checkResponse);
//   }

//   saveNewUserInfo(userInformaiton) {
//     return fetch(this._baseUrl + '/users/me', {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify(userInformaiton)
//     })
//       .then(this.__checkResponse);
//   }

//   saveNewUserAvatar(avatar) {
//     return fetch(this._baseUrl + '/users/me/avatar', {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify(avatar)})
//       .then(this.__checkResponse);
//   }

//   postNewCard(cardInformation) {
//     return fetch(this._baseUrl + '/cards', {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify(cardInformation)})
//       .then(this.__checkResponse);
//   }

//   removeCard(cardId) {
//     return fetch(this._baseUrl + '/cards/' + cardId, {
//       method: 'DELETE',
//       headers: this._headers,
//       })
//       .then(this.__checkResponse);
//   }

//   putLikeCard(cardId) {
//     return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
//       method: 'PUT',
//       headers: this._headers,
//       })
//       .then(this.__checkResponse);
//   }

//   deleteLike(cardId) {
//     return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
//       method: 'DELETE',
//       headers: this._headers,
//       })
//       .then(this.__checkResponse);
//   }
// }

// export const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
//     headers: {
//       authorization: '990eb1b4-940b-4d98-be8e-e780cfa06b2c',
//       'Content-Type': 'application/json'
//     }
// });