export const appDirective  = app => {
    app.directive('track',{
        mounted(el,binding,vnode){
            el.addEventListener('click',async() => {
                console.log(binding)
                const data = {
                    ip:localStorage.getItem('ip'),
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
}