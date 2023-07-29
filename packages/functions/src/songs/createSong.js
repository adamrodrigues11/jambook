import { createSong } from "@jambook/core/src/database";

export async function main(event) {
    const { name, song } = JSON.parse(event.body);
    
    try {
        const newSong = createSong(name, song);
        return {
            statusCode: 200,
            body: JSON.stringify({
              song: newSong,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
              error: error.message,
            }),
        };
  };
}