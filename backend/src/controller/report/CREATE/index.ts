import { Request, Response } from "express";

import { sendReport } from "../../trigger/reportConfigController";
import { GetReport, getReportSchema } from "../../../model/schema/reportSchema";
import { getHostGroup } from "../../../service/fetch/requestHostGroups";
import { CONSTANTS } from "../../../config/server";
import { NotFoundError } from "../../../model/api-errors";

const loadReport = async (req: Request, res: Response) => {
  const requestData: GetReport = await getReportSchema.validate(req.body, { abortEarly: false });

  const { groupid, timeLastSice, timeLastTill, title } = requestData;

  const checkHostGroup = await getHostGroup(groupid);

  if (checkHostGroup.result.length > 0) {

    const pdfName = await sendReport({ title, groupid, lastChangeSince: timeLastSice, lastChangeTill: timeLastTill });

    return res.status(200).json({
      result: {
        url: `${CONSTANTS.SERVER}/${pdfName}`,
        message: 'PDF Generate Sucessfully'
      }
    });
  }
  
  throw new NotFoundError("HostGroup Not Found");
};

export { loadReport };