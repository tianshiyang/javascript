// 题目描述：JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个
class Scheduler {
  max = 0
  queue = []
  count = 0
  constructor(max) {
    this.max = max
  }
  add(time, order) {
    const addQueue = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order)
          resolve()
        }, time)
      })
    }
    this.queue.push(addQueue)
  }
  taskStart() {
    for (let i = 0; i < this.queue.length; i ++) {
      this.request()
    }
  }
  request() {
    if (!this.queue.length || this.count >= this.max) {
      return
    }
    this.count ++
    this.queue.shift()().then(() => {
      this.count --
      this.request()
    })
  }
}

// 测试
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
