"use client";

// export const baseUrl = "https://backend.joe13th.com/api/",
export const headerConfigKeyName = "Joe13";



export function getHeaderConfig() {
  if (
	typeof localStorage !== "undefined" &&
	localStorage.getItem(headerConfigKeyName)
  ) {
	return {
	  headers: {
		"Content-Type": "multipart/form-data",
		Accept: "application/json",
		"Accept-Language": "ar",
		'Authorization': ` Bearer ${JSON.parse(localStorage.getItem(headerConfigKeyName))}`,
	  },
	};
	//  JSON.parse(localStorage.getItem(headerConfigKeyName));
  } else {
	return {
	  headers: {
		"Content-Type": "multipart/form-data",
		Accept: "application/json",
		"Accept-Language": "en",
	  },
	};
  }
}


export function clearAuthInfo() {
  if (typeof window !== "undefined") {
	localStorage.removeItem(headerConfigKeyName);
  }
}
