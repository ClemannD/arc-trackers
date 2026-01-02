import { NextResponse } from 'next/server';

import type { Item } from '@/lib/arc-raiders-data-api/models/item.model';

const EXTERNAL_API = 'https://metaforge.app/api/arc-raiders';
const PAGE_SIZE = 100; // Fetch in batches

interface ExternalResponse {
  data: Item[];
  maxValue: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

async function fetchPage(page: number): Promise<ExternalResponse> {
  const url = `${EXTERNAL_API}/items?page=${page}&limit=${PAGE_SIZE}&includeComponents=true`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(
      `Failed to fetch items page ${page}: ${response.status} ${errorText}`,
    );
  }

  return response.json();
}

export async function GET() {
  try {
    // Fetch first page to get pagination info
    const firstPage = await fetchPage(1);
    const { totalPages } = firstPage.pagination;

    // If only one page, return it directly
    if (totalPages <= 1) {
      return NextResponse.json(firstPage);
    }

    // Fetch remaining pages in parallel
    const remainingPages = Array.from(
      { length: totalPages - 1 },
      (_, i) => i + 2,
    );
    const pageResults = await Promise.all(remainingPages.map(fetchPage));

    // Combine all items
    const allItems: Item[] = [
      ...firstPage.data,
      ...pageResults.flatMap((result) => result.data),
    ];

    // Return combined response with updated pagination
    return NextResponse.json({
      data: allItems,
      maxValue: firstPage.maxValue,
      pagination: {
        page: 1,
        limit: allItems.length,
        total: allItems.length,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items from external API' },
      { status: 500 },
    );
  }
}
