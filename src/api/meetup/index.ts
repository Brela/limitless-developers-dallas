// services/meetup/index.js

const API_URL = 'https://api.meetup.com/gql';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Consider securely managing the access token

interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

interface EventData {
  event: {
    title: string;
    description: string;
    dateTime: string;
  };
}

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<GraphQLResponse<T>> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.statusText}`);
  }

  return response.json() as Promise<GraphQLResponse<T>>;
}
/*
export async function getEventById(eventId) {
  const query = `
    query GetEventById($eventId: ID!) {
      event(id: $eventId) {
        title
        description
        dateTime
      }
    }
  `;
  const variables = { eventId };
  return fetchGraphQL(query, variables);
} */

// More functions for other queries...
