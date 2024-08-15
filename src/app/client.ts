import { createThirdwebClient } from "thirdweb";

const CLIENT_ID = process.env.NEXT as string;

export const client = createThirdwebClient({
  clientId: CLIENT_ID,
});
