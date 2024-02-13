'use server';

import { cookies } from 'next/headers';
import { getMeetupAccessToken } from '../getMeetupAccessToken';

const API_URL = 'https://api.meetup.com/gql';

// Consider securely managing the access token

interface GraphQLResponse<T> {
  data: any;
  errors?: { message: string }[];
}

export async function fetchGraphQL(query: string, variables?: any): Promise<any> {
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

export async function fetchAllEvents() {
  const slugs = [
    'AWS-Dallas',
    'reactjsdallas',
    'dallas-software-developers-meetup',
    'plano-prompt-engineers',
  ];
  try {
    const results = await Promise.all(
      slugs.map((slug) =>
        getEventsBySlug(slug).catch((error) => {
          console.error(`Error fetching events for slug ${slug}:`, error);
          return null;
        })
      )
    );

    // Filter out any null results due to errors
    const validResults = results.filter((result) => result !== null);

    // Assuming validResults now contains only the successful fetches
    const data = validResults.flatMap((res) =>
      res?.groupByUrlname?.upcomingEvents.edges.map((edge: any) => ({
        ...edge.node,
        groupLink: res?.groupByUrlname?.link,
      }))
    );

    // Sort the events by dateTime
    const sortedData = data.sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

    return sortedData;
  } catch (error) {
    console.error('Failed to fetch data with unexpected error:', error);
    throw error;
  }
}

// so far this only works for Pro Networks - i.e. L D of Dallas , not L D of Frisco
// usage:   const data = await getEventsBySlug('limitless-developers-dallas');
export async function getEventsBySlug(urlName: string) {
  const query = `
    query ($urlname: String!) {
      groupByUrlname(urlname: $urlname) {
        link
        upcomingEvents(input: {first: 1}, sortOrder: ASC) {
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
