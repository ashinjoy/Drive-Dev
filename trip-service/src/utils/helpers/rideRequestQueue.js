export class RideRequestQueue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }
  enqueue(value) {
    this.queue[this.tail] = value;
    this.tail++;
    this.size++;
  }
  dequeue() {
    if (this.size == 0) {
      return null;
    }
    let dequeueDriverId  = this.queue[this.head]
    this.queue[this.head] = null;
    this.head++;
    this.size--;
    return dequeueDriverId
  }
  peek() {
    if (this.size == 0) {
      return null;
    }
    return this.queue[this.head];
  }
  isEmpty(){
    return this.size == 0
  }
  print(){
    return this.queue
  }
}
