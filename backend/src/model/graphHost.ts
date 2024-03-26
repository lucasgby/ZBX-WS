export interface Graph {
  jsonrpc: string
  result: {
    graphid: string
    name: string
    width: string
    height: string
    yaxismin: string
    yaxismax: string
    templateid: string
    show_work_period: string
    show_triggers: string
    graphtype: string
    show_legend: string
    show_3d: string
    percent_left: string
    percent_right: string
    ymin_type: string
    ymax_type: string
    ymin_itemid: string
    ymax_itemid: string
    flags: string
  }[]
  id: number
}