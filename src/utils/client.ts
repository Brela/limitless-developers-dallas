'use client';

import { getCookie } from 'cookies-next';

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const POST = (url: string, data?: any) =>
  fetch(`${baseURL}/api${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('auth-token')}`,
    },
    body: JSON.stringify(data),
  });

export const GET = (url: string, params?: any, signal?: AbortSignal) => {
  const urlParams = new URLSearchParams(params).toString();
  const fullURL = `${baseURL}/api${url}?${urlParams}`;
  return fetch(fullURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('auth-token')}`,
    },
    cache: 'no-cache',
    signal,
  });
};

export const PUT = (url: string, data: any) =>
  fetch(`${baseURL}/api/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('auth-token')}`,
    },
    body: JSON.stringify(data),
  });

export const DELETE = (url: string) =>
  fetch(`${baseURL}/api${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('auth-token')}`,
    },
  });

export const PATCH = (url: string, data?: any) =>
  fetch(`${baseURL}/api${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('auth-token')}`,
    },
    body: JSON.stringify(data),
  });

export const PATCH_WITHOUT_AUTH = (url: string, data?: any) =>
  fetch(`${baseURL}/api${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const GET_WITHOUT_AUTH = (url: string) =>
  fetch(`${baseURL}/api${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const PUT_WITHOUT_AUTH = (url: string, data?: any) =>
  fetch(`${baseURL}/api${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
