interface ReportResult {
  result: Report[]
}

interface TopTriggerResult {
  result: { text: string, style: string }[][];
}

interface Report {
  header: {
    title: string,
    quantity: number
  },

  hosts: [string, string, string][];
}

export { ReportResult, TopTriggerResult, Report }