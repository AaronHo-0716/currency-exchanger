import axios from "axios";

export default async function fetchRate(currencyCode = "USD") {
  const response = await axios(
    `https://open.er-api.com/v6/latest/${currencyCode}`
  );
  const { data } = response;
  return data;
}
