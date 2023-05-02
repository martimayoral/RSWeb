import axios from 'axios';
import { select } from 'redux-saga/effects';
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const getApiUrl = (): string => {
  return process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
};

export function* callApi(
  method: ApiMethod,
  url: string,
  body?: any,
  auth: boolean = true
): Generator<any, any, any> {

  let headers: any = {
    'Content-Type': 'application/json',
    'X-Localization': 'es',
  }

  if (auth) {
    const authToken: string = yield select(s => s.auth.token)
    if (authToken)
      headers['Authorization'] = "Bearer " + authToken
  }

  const response = yield axios({
    url,
    method,
    headers,
    ...(method === 'GET' ? { params: body } : { data: body })
  });

  return response;
}/* 

export function* callApi(
  method: ApiMethod,
  url: string,
  body?: any
) {
  // console.log("API Call", method, url, body)

  const token: string = yield getAuthToken()

  const response: AxiosResponse = yield axios({
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Localization': 'es',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(method === 'GET' ? { params: body } : { data: body })
  });
  // console.log('API Response', { method, url, response });

  return response;
} */
/* 
export async function callApi(method: ApiMethod, url: string, body?: any): Promise<AxiosResponse> {

  const token = cookie.get('exhibify_token');
  // console.log(token)
  try {
    return await callApiWithoutRefresh(method, url, body, token);
  } catch (error: any) {
    if (error.request.status === 401 && token) {
      // Try to refresh token at least once
      const res = await refreshToken();
      if (!isSuccessResponse(res, true)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return error.response;
        }
        return error;
      }

      const { data: tokenInfo } = res.data;

      // Save token on cookie
      const { access_token } = tokenInfo;
      cookie.set('exhibify_token', access_token, {
        expires: 999999
      });

      try {
        return await callApiWithoutRefresh(method, url, body);
      } catch (error: any) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return error.response;
        }
        return error;
      }
    }

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response;
    }
    return error;
  }
}
 *//* 
export function* callApiFile(method: ApiMethod, url: string, body?: { mediaType: ArtworkMediaType, file: File }) {
try {
const token: string = yield getAuthToken()

if (!token) {
return {
data: {
error: true,
error_code: 'token_not_exist'
}
};
}

if (!body) {
return {
data: {
error: true,
error_code: 'no_file_provided'
}
}
}
const data = new FormData()
const type = body.mediaType === "IMAGE" ? 'photo' : body.mediaType === "SCULPTURE" ? 'sculpture' : 'video'
data.append(type, body.file)

// console.log("callApi file", data, body)

const response: AxiosResponse = yield axios({
url: url,
method: method,
headers: {
'Content-Type': 'multipart/form-data',
'X-Localization': 'es',
...(token ? { Authorization: `Bearer ${token}` } : {})
},
data
})

// console.log("callApi file response", response)

return response;

} catch (error: any) {
if (error.response) {
// The request was made and the server responded with a status code
// that falls out of the range of 2xx
return error.response;
}
return error;
}
}

export const isTokenExpired = (code: string) => {
return code === 'expired_token';
};

export const isTokenInvalid = (code: string) => {
return code === 'invalid_token';
};

export const needsLogin = (code: string) => {
return code === 'token_not_exist';
}; */
