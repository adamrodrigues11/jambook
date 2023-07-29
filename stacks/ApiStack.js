import { Api } from "sst/constructs";

export function API({ stack }) {
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        }
      },
    },
    routes: {
      "GET /songs": "packages/functions/src/songs/getSongs.main",
      "POST /songs": "packages/functions/src/songs/createSong.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api };
}
