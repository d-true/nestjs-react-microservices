import { PaginationResponse } from '../features/pagination/pagination.types.ts';
import { SetURLSearchParams } from 'react-router';
import React, { SetStateAction } from 'react';

export default function Pagination({
    pagination,
    setSearchParams,
    setTriggerRefresh,
}: {
    pagination: PaginationResponse | null;
    setSearchParams: SetURLSearchParams;
    setTriggerRefresh: React.Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div>
            <div className="pagination text-center">
                {pagination
                    ? Array.from(Array(pagination.totalPages).keys()).map(
                          (page) => {
                              return (
                                  <button
                                      onClick={() => {
                                          setSearchParams((searchParams) => {
                                              searchParams.set(
                                                  'page',
                                                  `${page + 1}`,
                                              );
                                              return searchParams;
                                          });
                                          setTriggerRefresh(true);
                                      }}
                                      data-active={
                                          page === pagination.currentPage - 1
                                      }
                                      key={page}
                                  >
                                      {page + 1}
                                  </button>
                              );
                          },
                      )
                    : null}
            </div>
            <div className="text-center mt-4">
                <button
                    className="btn"
                    onClick={() => {
                        setSearchParams((searchParams) => {
                            searchParams.set('order', 'ASC');
                            return searchParams;
                        });
                        setTriggerRefresh(true);
                    }}
                >
                    Order ASC
                </button>
                <button
                    className="btn"
                    onClick={() => {
                        setSearchParams((searchParams) => {
                            searchParams.set('order', 'DESC');
                            return searchParams;
                        });
                        setTriggerRefresh(true);
                    }}
                >
                    Order DESC
                </button>
            </div>
        </div>
    );
}
