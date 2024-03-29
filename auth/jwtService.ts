import $axios from "@/plugins/axios";
import {
  loginEndpoint,
  logoutEndpoint,
  refreshEndpoint,
  refreshTokenKeyName,
  tokenKeyName,
} from "./jwt.config";
import router from "@/router";
import type { UserData } from "./types";

export function login(
  ...args
): Promise<{ data: { access: string; refresh: string } }> {
  return $axios.post(loginEndpoint, ...args, {
    headers: { no_add_token: true },
  });
}

export async function logout(isClearOnly: boolean = true): Promise<void> {
  if (!isClearOnly) await $axios.post(logoutEndpoint);

  document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  window.location.reload();
}

export function setAccessToken(value): void {
  setCookie(tokenKeyName, value, import.meta.env.VITE_TOKEN_EXPIRED_DATE | 1);
}

export function getAccessToken(): string {
  return getCookie(tokenKeyName);
}

export function setRefreshToken(value): void {
  setCookie(
    refreshTokenKeyName,
    value,
    import.meta.env.VITE_TOKEN_EXPIRED_DATE | 1
  );
}

export function getRefreshToken(): string {
  return getCookie(refreshTokenKeyName);
}

export function getUserData(): UserData {
  return parseJWT(getCookie(tokenKeyName)).user_data;
}

export function refreshToken() {
  return $axios.post(refreshEndpoint, {
    refresh: getRefreshToken(),
  });
}

export function isUserLoggedIn(): boolean {
  if (getRefreshToken() && getAccessToken()) return true;
  return false;
}

function setCookie(name: string, value: object, expirationDays: number): void {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name: string): string {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return "";
}

function parseJWT(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}
