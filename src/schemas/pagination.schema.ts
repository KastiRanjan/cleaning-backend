/**
 * @openapi
 * components:
 *  parameters:
 *    PageParam:
 *      in: query
 *      name: page
 *      description: The page number for pagination.
 *      required: false
 *      schema:
 *        type: integer
 *        default: 1
 *
 *    RowsPerPageParam:
 *      in: query
 *      name: rowsPerPage
 *      description: The number of rows to display per page.
 *      required: false
 *      schema:
 *        type: integer
 *        default: 10
 *
 *    SortByParam:
 *      in: query
 *      name: sortBy
 *      description: The field to sort by.
 *      schema:
 *        type: string
 *
 *    SortOrderParam:
 *      in: query
 *      name: sortOrder
 *      description: The sorting order (asc or desc).
 *      required: false
 *      schema:
 *        type: string
 *        enum: [ASC, DESC]
 *
 *    SearchKeywordParam:
 *      in: query
 *      name: searchKeyword
 *      description: A keyword for searching.
 *      required: false
 *      schema:
 *        type: string
 *
 *    StatusBY:
 *      in: query
 *      name: isActive
 *      description: A keyword for filter by status.
 *      required: false
 *      schema:
 *        type: boolean
 *
 *    Status:
 *      in: query
 *      name: isActive
 *      description: A keyword for filter by status.
 *      required: false
 *      schema:
 *        type: string
 */
