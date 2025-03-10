import { nextTick } from "vue"
export const appDirective  = app => {
    app.directive('track',{
        mounted(el,binding){
            el.addEventListener('click',async() => {
                const data = {
                    event:'click',
                    type:binding.value.type,
                    target:binding.value.target
                  }
                  await fetch('/api/track',{
                    method:'post',
                    headers:{
                      'Content-Type':'application/json'
                    },
                    body:JSON.stringify(data)
                  });
            })
        },
        unmounted(el,binding){
            el && el.removeEventListener('click',() => {

            })
        }
    })

    app.directive('autofocus',{
          mounted(el) {
            el.focus();
      },
    })
    
    const lazyLoadDirective = {
      mounted(el, binding) {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target;
              lazyImage.src = binding.value;
              lazyImage.onload = () => {
                observer.unobserve(lazyImage);
              };
              lazyImage.onerror = () => {
                lazyImage.src = '/lejibiji.png'; // 设置默认图片
              };
            }
          });
        },{
          rootMargin: '100px' // 提前100px开始加载
        });
        observer.observe(el);
      },
    };
    
    app.directive('lazyload', lazyLoadDirective);


    const draggableDirective = {
      beforeMount(el) {
        el.style.position = 'fixed'; // 确保元素可以移动
        el.style.cursor = 'move';
        el.onmousedown = function(e) {
          // 获取初始位置的偏移量
          const startX = e.clientX - el.getBoundingClientRect().left;
          const startY = e.clientY - el.getBoundingClientRect().top;
    
          function onMouseMove(e) {
            // 计算新位置
            const newX = e.clientX - startX;
            const newY = e.clientY - startY;
            el.style.left = `${newX}px`;
            el.style.top = `${newY}px`;
          }
    
          // 添加mousemove事件监听
          document.addEventListener('mousemove', onMouseMove);
    
          // 鼠标释放时，清除事件监听器
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
          }, { once: true }); // 使用once选项自动移除事件监听器
        };
      },
    };
    
    // 注册自定义指令
    app.directive('draggable', draggableDirective);
    
}

