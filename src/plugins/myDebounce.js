export default function myDebounce(func, time) {
    let timeOut;
    let args = arguments
    return function() {
        clearTimeout(timeOut)
        timeOut = setTimeout(()=> {
            func.call(this, args)// 1.this指向问题 2.func函数有事件e
        }, time);
    }
}