import uuid from 'react-native-uuid'

export default class Todo {
  createdAt: Date;
  text: string;
  tags?: string[];
  isCompleted: boolean;
  id: string;

  constructor(text: string, tags: string[] = [], isCompleted = false, createdAt = new Date()) {
    this.text = text
    this.tags = [...tags]
    this.isCompleted = isCompleted
    this.createdAt = createdAt // TODO: Make sure this will only work in debug mode?
    this.id = uuid.v4() as string
  }
}