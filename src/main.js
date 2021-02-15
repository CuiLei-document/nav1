console.log(jQuery)
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'A', url: 'https://baidu.com'},
    {logo: 'B', url: 'https://www.bilibili.com'}
]
// console.log(hashMap)

const removeX = (url) =>{
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除 / 开头的内容
    
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) =>{
        console.log(index)
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo}  </div>
                    <div class="link">${removeX(node.url)}</div>
                    <div class="close">
                        <svg class="icon" >
                            <use xlink:href="#icon-close">
                            </use>
                        </svg>
                    </div>
                </div>  
         </li>`).insertBefore($lastLi)
        $li.on('click', ()=>{
            window.open(node.url)
        })
        $li.on('click', '.close' , (e)=>{
            e.stopPropagation() // 当点击 icon x 的时候阻止冒泡
            console.log(hashMap)
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton')
   .on('click', ()=>{
       let url = window.prompt('请问您要输入的网址是什么')
       if(url.indexOf('http')!==0){
           url = 'https://' + url 
       }
       console.log(url)
       hashMap.push({
           logo: removeX(url)[0],
        //    logoType: 'text',
           url: url}
        )
        render()      
   });
   window.onbeforeunload = () =>{
       const string = JSON.stringify(hashMap)
       localStorage.setItem('x', string)
   }
   // 键盘按键打开网址绑定 
$(document).on('keypress', (e)=>{
    const {key} = e
    // console.log(e.key)
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})
