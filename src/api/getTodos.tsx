export type TodoFetch = {
  id: number;
  title: string;
  completed: boolean;
};

export const getTodos = async () => {
  await wait(2000);
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .then((data) => data as TodoFetch[]);
};

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
