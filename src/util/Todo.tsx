import uuid from 'react-native-uuid'

export default class Todo {
  createdAt: Date;
  text: string;
  tags?: string[];
  isCompleted: boolean;
  id: string;

  constructor(text: string, tags: string[] = [], isCompleted = false) {
    this.text = text
    this.tags = [...tags]
    this.isCompleted = isCompleted
    this.createdAt = new Date()
    this.id = uuid.v4() as string
  }
}