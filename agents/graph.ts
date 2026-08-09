import {
  Annotation,
  END,
  START,
  StateGraph,
} from "@langchain/langgraph";

import {
  InvestmentReport,
  runInvestmentAgent,
} from "./investmentAgent";

// --------------------------------------------------
// GRAPH STATE
// --------------------------------------------------

const InvestmentState = Annotation.Root({
  company: Annotation<string>,

  report: Annotation<InvestmentReport | null>,
});

// --------------------------------------------------
// RESEARCH NODE
// --------------------------------------------------

async function researchNode(
  state: typeof InvestmentState.State
) {
  console.log(
    `LangGraph: starting research for ${state.company}`
  );

  const report = await runInvestmentAgent(state.company);

  console.log(
    `LangGraph: research completed for ${state.company}`
  );

  return {
    report,
  };
}

// --------------------------------------------------
// BUILD GRAPH
// --------------------------------------------------

const workflow = new StateGraph(InvestmentState)

  // Research node
  .addNode("research", researchNode)

  // Start → Research
  .addEdge(START, "research")

  // Research → End
  .addEdge("research", END);

// --------------------------------------------------
// COMPILE GRAPH
// --------------------------------------------------

export const investmentGraph = workflow.compile();

// --------------------------------------------------
// PUBLIC FUNCTION
// --------------------------------------------------

export async function runInvestmentGraph(
  company: string
) {
  if (!company || !company.trim()) {
    throw new Error("Company name is required");
  }

  const result = await investmentGraph.invoke({
    company: company.trim(),
    report: null,
  });

  return result.report;
}