import { type NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API = 'https://metaforge.app/api/arc-raiders';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const url = `${EXTERNAL_API}/items${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      return NextResponse.json(
        { error: `Failed to fetch items: ${response.status} ${errorText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items from external API' },
      { status: 500 },
    );
  }
}

