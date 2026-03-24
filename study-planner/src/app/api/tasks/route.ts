import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Resolves to c:\Users\User\OneDrive\Desktop\antifolder\data\tasks.json
// since process.cwd() is the study-planner directory.
const dataFilePath = path.join(process.cwd(), '../data/tasks.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.tasks);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return NextResponse.json(
      { error: 'Failed to load tasks from data file.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON payload
    const body = await request.json();
    
    // Read the existing file
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Generate an auto-incrementing ID
    const newId = data.tasks.length > 0 
      ? Math.max(...data.tasks.map((t: any) => t.id)) + 1 
      : 1;

    const newTask = {
      id: newId,
      ...body,
      completed: body.completed ?? false
    };
    
    // Append the new task and write back to the file
    data.tasks.push(newTask);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 4), 'utf8');
    
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error saving task:', error);
    return NextResponse.json(
      { error: 'Failed to add the new task.' },
      { status: 500 }
    );
  }
}
