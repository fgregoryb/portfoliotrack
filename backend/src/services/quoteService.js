const axios = require('axios')

async function getQuote(ticker) {
  try {
    const response = await axios.get(
      `https://brapi.dev/api/quote/${ticker}`,
      {
        params: { token: process.env.BRAPI_TOKEN }
      }
    )

    const result = response.data.results[0]

    if (!result) {
      throw new Error(`Quote not found for ticker ${ticker}`)
    }

    return {
      ticker: result.symbol,
      price: result.regularMarketPrice,
      name: result.longName || result.shortName
    }
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Ticker ${ticker} not found`)
    }
    throw new Error(`Failed to fetch quote: ${error.message}`)
  }
}

module.exports = { getQuote }