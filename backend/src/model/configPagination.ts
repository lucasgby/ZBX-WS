interface Props {
  take?: number;
  page?: number
}

export function formatPagination({ page, take }: Props) {

  const takeFormat = take ?? 20;
  const pageFormat = page ? (Number(page) - 1) * takeFormat : 0;

  const pagination = {
    page: pageFormat,
    take: takeFormat
  }

  return {
    pagination
  }
}