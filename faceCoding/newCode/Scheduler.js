// 题目描述：JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个
class Scheduler {
  constructor(max) {
    this.max = max
    this.cacheArr = []
    this.count = 0

  }

  add(delay, value) {
    this.cacheArr.push(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(value)
        }, delay);
      })
    })
  }

  start() {
    for (let i = 0; i < this.cacheArr.length; i ++) {
      if (this.count < this.max) {
        this.cacheArr.shift()().then((value) => {
          this.count --
          console.log(value)
          this.start()
        })
      }
    }
  }
}


const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.start();