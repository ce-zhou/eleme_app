export const sendRequest = (tasks, maxNum) => {
  // 当tasks长度为0时返回空数组
  return new Promise((resolve) => {
    if (tasks.length == 0) {
      resolve([]);
      return;
    }
    let index = 0; // 下一个请求的下标
    let count = 0; // 当前请求完成的数量
    let results = []; // 存放结果
    async function request() {
      if (index === tasks.length) return;
      const i = index; // 保存序号，使result和urls相对应
      const task = tasks[index];
      index++;
      try {
        const { data: res } = await task;
        // resp 加入到results
        results[i] = res;
      } catch (err) {
        // err 加入到results
        results[i] = err;
      } finally {
        count++;
        // 判断是否所有的请求都已完成
        if (count === tasks.length) {
          resolve(results);
        }
        request();
      }
    }
    const times = Math.min(maxNum, tasks.length);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
};
