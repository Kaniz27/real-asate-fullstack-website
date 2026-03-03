// src/hooks/useApi.js
"use client";

import { useCallback, useState } from "react";
import { publicApi, adminApi, setAdminToken } from "../lib/api";

export default function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ dynamic token set/remove (admin only)
  const setToken = useCallback((token) => {
    setAdminToken(token || null);
  }, []);

  const handleError = (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    setError(msg);
    return msg;
  };

  // ---------- PUBLIC (NO token, NO credentials) ----------
  const publicRequest = useCallback(async ({ url, method = "GET", body, params, headers }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await publicApi.request({
        url,
        method,
        data: body,
        params,
        headers,
        withCredentials: false, // ✅ force bypass
      });
      setData(res.data);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const publicGet = useCallback((url, params, headers) => {
    return publicRequest({ url, method: "GET", params, headers });
  }, [publicRequest]);

  const publicPost = useCallback((url, body, headers) => {
    return publicRequest({ url, method: "POST", body, headers });
  }, [publicRequest]);

  // ---------- ADMIN (token + credentials) ----------
  const adminRequest = useCallback(async ({ url, method = "GET", body, params, headers, token }) => {
    setLoading(true);
    setError(null);

    // per-request token override (optional)
    if (typeof token !== "undefined") setAdminToken(token);

    try {
      const res = await adminApi.request({
        url,
        method,
        data: body,
        params,
        headers,
        withCredentials: true, // ✅ admin only
      });
      setData(res.data);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const adminGet = useCallback((url, params, token, headers) => {
    return adminRequest({ url, method: "GET", params, token, headers });
  }, [adminRequest]);

  const adminPost = useCallback((url, body, token, headers) => {
    return adminRequest({ url, method: "POST", body, token, headers });
  }, [adminRequest]);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    reset,

    // admin token setter
    setToken,

    // public endpoints
    publicRequest,
    publicGet,
    publicPost,

    // admin endpoints
    adminRequest,
    adminGet,
    adminPost,
  };
}