import { PaginationProps } from "@/types/Pagination";
import { useReducer, useState } from "react";

type Action = {
  type: 'next_page' | 'prev_page',
}

interface PaginationType {
  page: number;
  take: number
}

export function PaginationState(page_total: number) {
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(20);

  function alterPage(action: Action) {
    switch (action.type) {
      case 'next_page':
        page < page_total ? setPage(state => state + 1) : setPage(state => state)
        break;
      case 'prev_page':
        page === 1 ? setPage(1) : setPage(state => state - 1)
    }
  }

  /*
  const [paginationState, dispatch] = useReducer(appReducer, { page: 1, take: 20 });
  function appReducer(state: PaginationType, action: Action) {
    switch (action.type) {
      case 'next_page':
        return { ...state, page: state.page + 1 };

      case 'prev_page':
        return { ...state, page: state.page + 1 };

      default:
        return state
    }
  }
*/
  return {
    page,
    take,
    alterPage,
  }
}