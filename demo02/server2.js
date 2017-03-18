// koa router 中间件 koa2 对应的router的版本是 7.x -> npm install koa-router@7
// See koa-router 7.x for koa 2.x and async/await support.

const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')

// 子路由1
let home = new Router()
home.get('/', async ( ctx ) =>{
  let html = `<ul>
                <li>
                  <a href="/page/hellokoa2">Hello Koa2</a>
                  <a href="/page/404">Sorry I'm 404</a>
                </li>
              </ul>`
  ctx.body = html;
})

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404!'
}).get('/hellokoa2', async ( ctx )=>{
  ctx.body = 'hellokoa2'
})

// 装载所有路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000); // 粗心写成了app.use

console.log('[demo] koa-router is starting at port 3000...')