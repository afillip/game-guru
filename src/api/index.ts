import { IBoardGame } from '../contracts/interfaces/IBoardGame';
import { IPostGameRequest } from '../contracts/interfaces/requests';
import { IPostGameResponse } from '../contracts/interfaces/responses';

export async function test() {
  let response = await fetch('http://localhost:3000/api/games', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let responseBody = await response.json();

  console.log(responseBody);
}

export async function createGame(req: IPostGameRequest['body']) {
  try {
    let response = await fetch('http://localhost:3000/api/games', {
      body: JSON.stringify(req),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let responseBody: IPostGameResponse = await response.json();
  } catch (err) {
    console.error('Error in createGame', err);
  }
}
