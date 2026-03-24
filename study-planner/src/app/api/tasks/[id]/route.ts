import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), '../data/tasks.json');

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const taskId = parseInt(id, 10);
    const body = await request.json();

    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);

    const taskIndex = data.tasks.findIndex((t: any) => t.id === taskId);
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Update the task's completed status
    data.tasks[taskIndex].completed = body.completed;

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 4), 'utf8');

    return NextResponse.json(data.tasks[taskIndex]);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task.' },
      { status: 500 }
    );
  }
}
