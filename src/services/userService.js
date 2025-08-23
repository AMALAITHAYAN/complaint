// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

/** Helper: get current username from storage */
function getStoredUsername() {
  return (
    localStorage.getItem('username') ||
    sessionStorage.getItem('username') ||
    ''
  );
}

/** Get a user by username (tries path, then query, then list fallback) */
async function getByUsername(usernameInput) {
  const username = (usernameInput || '').trim() || getStoredUsername();
  if (!username) {
    return { data: null };
  }

  // 1) /api/users/{username}
  try {
    const r1 = await axios.get(`${API_URL}/${encodeURIComponent(username)}`);
    if (r1?.data) return { data: r1.data };
  } catch (_) {
    // ignore and keep trying
  }

  // 2) /api/users?username=<username>
  try {
    const r2 = await axios.get(API_URL, { params: { username } });
    const payload = r2?.data;
    if (Array.isArray(payload)) {
      const found = payload.find(
        (u) =>
          (u?.username && u.username.toLowerCase() === username.toLowerCase()) ||
          (u?.name && u.name.toLowerCase() === username.toLowerCase())
      );
      if (found) return { data: found };
    } else if (payload && payload.username) {
      return { data: payload };
    }
  } catch (_) {
    // ignore and keep trying
  }

  // 3) GET all, filter client-side
  try {
    const r3 = await axios.get(API_URL);
    const list = Array.isArray(r3?.data) ? r3.data : [];
    const found = list.find(
      (u) =>
        (u?.username && u.username.toLowerCase() === username.toLowerCase()) ||
        (u?.name && u.name.toLowerCase() === username.toLowerCase())
    );
    return { data: found ?? null };
  } catch (err) {
    // Final failure
    return { data: null, error: err };
  }
}

/** Convenience: "my profile" using stored username */
async function getMyProfile(username) {
  return getByUsername(username);
}

/**
 * Update the current user's password.
 * Typical admin endpoint pattern in your codebase:
 *   PUT /api/users/{id}  with { password: 'newPass' }
 * Some places might expect { newPassword } — we send both keys to be safe.
 */
async function updateMyPassword(userId, _oldPassword, newPassword) {
  if (!userId) throw new Error('userId is required');

  const body = {
    // send both keys; backend will ignore one if not used
    password: newPassword,
    newPassword: newPassword,
  };

  return axios.put(`${API_URL}/${encodeURIComponent(userId)}`, body);
}

/** Optional helper to set username consistently */
function setCurrentUsername(username) {
  if (!username) return;
  localStorage.setItem('username', username);
}

const userService = {
  getMyProfile,
  getByUsername,
  updateMyPassword,
  setCurrentUsername,
};

export default userService;
