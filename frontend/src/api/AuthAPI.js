import { getAuth } from "firebase/auth";

export async function apiFetch(path, options = {}) {
  const auth = getAuth();
  const user = auth.currentUser;

  // If not logged in, block the call (or redirect)
  if (!user) throw new Error("Not authenticated");

  // Get token (SDK auto-refreshes; force refresh if 401 later)
  let token = await user.getIdToken();

  const doFetch = async (tkn) => fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${tkn}`,
    },
  });

  // First try
  let res = await doFetch(token);

  // If token was expired, refresh once and retry
  if (res.status === 401) {
    token = await user.getIdToken(true); // force refresh
    res = await doFetch(token);
  }

  if (!res.ok) throw new Error(`${res.status} ${await res.text().catch(() => "")}`);
  return res.json();
}


export async function signup(){
  try{
    await apiFetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });
  }
  catch(error){
    console.error("Error signing up:", error);
  }
}