# `useFacet`

## Features

`useFacet` composition function can be used to fetch search index data related to:

* products,
* categories,
* breadcrumbs.

What makes it powerful is the ability to accept multiple filters, allowing to narrow down the results to a specific category, search term, etc.

## API

`useFacet` contains the following properties:

- `search` - function for searching and classifying records, allowing users to browse the catalog data. It accepts a single object as a parameter with following signature:

```ts
interface FacetSearchResult<FacetResultsData> {
    input: AgnosticFacetSearchParams;
}
```

where:

```ts
export interface AgnosticFacetSearchParams {
  categorySlug?: string;
  rootCatSlug?: string;
  term?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
};
```

- `result` - reactive data object containing the response from the backend.

- `loading` - reactive object containing information about the loading state of `search`.

- `error` - reactive object containing the error message, if `search` failed for any reason.

```ts
interface UseFacetErrors {
  search: Error;
}
```

## Getters
Because the `result` property is a raw response with some additional properties, it's recommended to use `facetGetters` for accessing any data from it. It includes the following helper functions:

- `getAll` - returns all available facets.

- `getGrouped` - returns grouped facets by facet name.

- `getCategoryTree` - return the tree of nested categories.

- `getSortOptions` - returns available and currently selected sorting options.

- `getProducts` - returns products matching current filters.

- `getPagination` - returns pagination information.

- `getBreadcrumbs` - returns breadcrumbs information.


```ts
interface FacetsGetters {
  getAll: (searchData: SearchData, criteria?: string[]) => AgnosticFacet[];
  getGrouped: (searchData: SearchData, criteria?: string[]) => AgnosticGroupedFacet[];
  getCategoryTree: (searchData: SearchData) => AgnosticCategoryTree;
  getSortOptions: (searchData: SearchData) => AgnosticSort;
  getProducts: (searchData: SearchData) => Product[];
  getPagination: (searchData: SearchData) => AgnosticPagination;
  getBreadcrumbs: (searchData: SearchData) => AgnosticBreadcrumb[];
}

interface AgnosticFacet {
  type: string;
  id: string;
  value: any;
  attrName?: string;
  count?: number;
  selected?: boolean;
  metadata?: any;
}

interface AgnosticGroupedFacet {
  id: string;
  label: string;
  count?: number;
  options: AgnosticFacet[];
}

interface AgnosticCategoryTree {
  label: string;
  slug?: string;
  items: AgnosticCategoryTree[];
  isCurrent: boolean;
  count?: number;
  [x: string]: unknown;
}

interface AgnosticSort {
  options: AgnosticFacet[];
  selected: string;
}

type SearchData = FacetSearchResult<FacetResultsData>

interface FacetSearchResult {
  data;
  input: AgnosticFacetSearchParams;
}

interface AgnosticFacetSearchParams {
  categorySlug?: string;
  rootCatSlug?: string;
  term?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
}

interface AgnosticPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  pageOptions: number[];
}

interface AgnosticBreadcrumb {
  text: string;
  link: string;
}

interface FacetResultsData {
  products: ProductVariant[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
}
```

## Example

```js
import { useFacet, facetGetters } from '@vue-storefront/sfcc';

setup(props, context) {
  const { result, search, loading } = useFacet();

  onSSR(async () => {
    await search({
      categorySlug: 'clothing',
      sort: 'latest',
      itemsPerPage: 10,
      term: 'some search query'
    });
  });

  return {
    products: computed(() => facetGetters.getProducts(result.value)),
    categoryTree: computed(() => facetGetters.getCategoryTree(result.value)),
    breadcrumbs: computed(() => facetGetters.getBreadcrumbs(result.value)),
    sortBy: computed(() => facetGetters.getSortOptions(result.value)),
    facets: computed(() => facetGetters.getGrouped(result.value, ['color', 'size'])),
    pagination: computed(() => facetGetters.getPagination(result.value)),
    loading
  }
}
```
