import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextRequest } from "next/server";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');
  
  try {
    // Check if we have a proper database connection
    if (!db) {
      throw new Error('No database connection');
    }
    
    // Fetch data from database with pagination
    const data = await db
      .select()
      .from(advocates)
      .limit(limit)
      .offset(offset);
    
    // Get total count for pagination info
    const totalResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(advocates);
    
    const total = totalResult[0]?.count || 0;
    
    return Response.json({ 
      data,
      pagination: {
        limit: limit,
        offset,
        total,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    // Fallback to static data
    const data = advocateData.slice(offset, offset + limit);
    return Response.json({ 
      data,
      pagination: {
        limit: limit,
        offset,
        total: advocateData.length,
        hasMore: offset + limit < advocateData.length
      }
    });
  }
}
