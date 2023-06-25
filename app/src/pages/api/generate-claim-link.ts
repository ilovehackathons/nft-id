// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  body: any;
  // underdogApiKey: string; // It works.
};

export default async function handler(
  req: NextApiRequest, // {name: "ilovehackathons", image: "https://avatars.githubusercontent.com/u/106395723?v=4"}
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    body: await createNft(req.body),
    // underdogApiKey: process.env.UNDERDOG_API_KEY, // It works.
  });
}

// curl localhost:3000/api/generate-claim-link --data '{"name": "ilovehackathons","image": "https://avatars.githubusercontent.com/u/106395723?v=4","receiverAddress":""}' --header 'content-type: application/json'

async function createNft({ prefix, name, image, receiverAddress }) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.UNDERDOG_API_KEY}`,
    },
    body: JSON.stringify({
      attributes: {
        profileUrl: `${prefix ?? "https://github.com/"}ilovehackathons`,
      },
      upsert: false,
      name,
      image,
      receiverAddress,
    }),
  };

  const res = await fetch(
    "https://dev.underdogprotocol.com/v2/projects/n/1/nfts",
    options
  );
  return res.json();
}
