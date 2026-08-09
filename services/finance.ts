import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

function formatNumber(value: unknown): string {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Data not available";
  }

  return value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}

function formatCurrency(
  value: unknown,
  currency = "USD"
): string {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Data not available";
  }

  return `${currency} ${value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
}

export async function getFinancialData(company: string) {
  try {
    // --------------------------------------------------
    // STEP 1: Search company and find its stock symbol
    // --------------------------------------------------

    const searchResult = await yahooFinance.search(company);

    const quoteResult = searchResult.quotes?.find(
      (quote: any) =>
        quote.isYahooFinance &&
        quote.quoteType === "EQUITY" &&
        typeof quote.symbol === "string" &&
        quote.symbol.length > 0
    );

    // If no company/ticker was found
    if (!quoteResult || typeof quoteResult.symbol !== "string") {
      return {
        company,
        symbol: "Data not available",
        revenue: "Data not available",
        profit: "Data not available",
        marketCap: "Data not available",
        peRatio: "Data not available",
      };
    }

    // IMPORTANT:
    // TypeScript now knows that symbol is a string.
    const symbol: string = quoteResult.symbol;

    console.log(`Yahoo Finance symbol found: ${symbol}`);

    // --------------------------------------------------
    // STEP 2: Get financial information
    // --------------------------------------------------

    const summary = await yahooFinance.quoteSummary(symbol, {
      modules: [
        "financialData",
        "defaultKeyStatistics",
        "summaryDetail",
      ],
    });

    // --------------------------------------------------
    // STEP 3: Extract Yahoo Finance sections
    // --------------------------------------------------

    const financialData = summary.financialData;
    const statistics = summary.defaultKeyStatistics;
    const summaryDetail = summary.summaryDetail;

    // --------------------------------------------------
    // STEP 4: Currency
    // --------------------------------------------------

    const currency =
      typeof financialData?.financialCurrency === "string"
        ? financialData.financialCurrency
        : "USD";

    // --------------------------------------------------
    // STEP 5: Revenue
    // --------------------------------------------------

    const revenue =
      financialData?.totalRevenue !== undefined
        ? formatCurrency(
            financialData.totalRevenue,
            currency
          )
        : "Data not available";

    // --------------------------------------------------
    // STEP 6: Profit
    // --------------------------------------------------

    let profit = "Data not available";

    if (
      financialData?.netIncomeToCommon !== undefined
    ) {
      profit = formatCurrency(
        financialData.netIncomeToCommon,
        currency
      );
    } else if (
      financialData?.profitMargins !== undefined &&
      financialData?.totalRevenue !== undefined
    ) {
      const calculatedProfit =
        financialData.totalRevenue *
        financialData.profitMargins;

      profit = formatCurrency(
        calculatedProfit,
        currency
      );
    }

    // --------------------------------------------------
    // STEP 7: Market Capitalization
    // --------------------------------------------------

    const marketCap =
      summaryDetail?.marketCap !== undefined
        ? formatCurrency(
            summaryDetail.marketCap,
            currency
          )
        : "Data not available";

    // --------------------------------------------------
    // STEP 8: P/E Ratio
    // --------------------------------------------------

    let peRatio = "Data not available";
    const trailingEps = statistics?.trailingEps;
    const regularMarketPrice = summaryDetail?.regularMarketPrice;

    if (
      typeof summaryDetail?.trailingPE === "number"
    ) {
      peRatio = formatNumber(
        summaryDetail.trailingPE
      );
    } else if (
      typeof trailingEps === "number" &&
      Number.isFinite(trailingEps) &&
      trailingEps !== 0 &&
      typeof regularMarketPrice === "number" &&
      Number.isFinite(regularMarketPrice)
    ) {
      const calculatedPE =
        regularMarketPrice /
        trailingEps;

      peRatio = formatNumber(calculatedPE);
    }

    // --------------------------------------------------
    // STEP 9: Return clean financial data
    // --------------------------------------------------

    return {
      company,
      symbol,
      revenue,
      profit,
      marketCap,
      peRatio,
    };
  } catch (error) {
    console.error(
      "Yahoo Finance error:",
      error
    );

    // --------------------------------------------------
    // IMPORTANT:
    // Never crash the complete investment research agent
    // just because financial data is unavailable.
    // --------------------------------------------------

    return {
      company,
      symbol: "Data not available",
      revenue: "Data not available",
      profit: "Data not available",
      marketCap: "Data not available",
      peRatio: "Data not available",
    };
  }
}