'use server';

import { cookies } from 'next/headers';
import { getMeetupAccessToken } from '../getMeetupAccessToken';

const API_URL = 'https://api.meetup.com/gql';

// Consider securely managing the access token

interface GraphQLResponse<T> {
  data: any;
  errors?: { message: string }[];
}

export async function fetchGraphQL<T>(query: string, variables?: any): Promise<any> {
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
    // Parse the response body to access detailed error information
    const errorBody = await response.text(); // Use .json() if the API returns JSON error responses
    throw new Error(`Network error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const res = await response.json();
  if (res.errors) {
    // Handle GraphQL errors specifically if present
    const errorMessage = res.errors.map((error: any) => error.message).join(', ');
    throw new Error(`GraphQL error: ${errorMessage}`);
  }

  return res.data as Promise<any>;
}

// so far this only works for Pro Networks - i.e. L D of Dallas , not L D of Frisco
// usage:   const data = await getEventsBySlug('limitless-developers-dallas');
export async function getEventsBySlug(urlName: string) {
  const query = `
    query ($urlname: String!) {
      groupByUrlname(urlname: $urlname) {
        link
        upcomingEvents(input: {first: 5}, sortOrder: ASC) {
          edges {
            node {
              id
              title
              description
              dateTime
              imageUrl
            }
          }
        }
      }
    }
    `;
  const variables = { urlname: urlName };
  return fetchGraphQL(query, variables);
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

//  works
export async function getSelf() {
  const query = `
    query { self { id name } }
    `;
  return fetchGraphQL(query);
}
