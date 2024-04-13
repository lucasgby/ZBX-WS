import { number, object, string } from "yup";

interface GetReport {
  groupid: number, 
  timeLastTill: string, 
  timeLastSice: string,
  title: string
}

const getReportSchema = object().shape({
  groupid: number().required(), 
  timeLastTill: string().required(), 
  timeLastSice: string().required(),
  title: string().required()
});

export { GetReport };

export { getReportSchema }