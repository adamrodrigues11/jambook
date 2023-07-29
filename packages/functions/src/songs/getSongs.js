import { getSongs } from "@jambook/core/src/database";

export async function main(event) {
    const songs = await getSongs();
    return {
    statusCode: 200,
    body: JSON.stringify({
      songs: songs,
    }),
  };
}