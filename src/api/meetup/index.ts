'use server';

import { cookies } from 'next/headers';
import { getMeetupAccessToken } from '../getMeetupAccessToken';

const API_URL = 'https://api.meetup.com/gql';

// Consider securely managing the access token

interface GraphQLResponse<T> {
  data: any;
  errors?: { message: string }[];
}

export async function fetchGraphQL<T>(query: string, variables?: any): Promise<GraphQLResponse<T>> {
  // now that we are getting the access token from this function call, we don't need to call it from FE
  const ACCESS_TOKEN = cookies().get('accessToken')?.value;

  if (!ACCESS_TOKEN) {
    await getMeetupAccessToken();
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response}`);
  }

  const res = await response.json();
  //   console.log(res);

  return res as Promise<GraphQLResponse<T>>;
}

// THIS ONE WORKS!!!
export async function getEventById(eventId: string) {
  const query = `
  query($eventId: ID!) {
    event(id: $eventId) {
      title
      eventUrl
      description
      dateTime
      duration
      host {
        id
        name
      }
      images {
        id
        baseUrl
        preview
      }
      group {
        id
        name
        urlname
      }
      tickets {
        edges {
          node {
            id
            user {
              name
            }
            createdAt
          }
        }
      }
    }
  }
  `;
  const variables = { eventId };
  return fetchGraphQL(query, variables);
}

export async function getSelf() {
  const query = `
    query { self { id name } }
    `;
  return fetchGraphQL(query);
}
