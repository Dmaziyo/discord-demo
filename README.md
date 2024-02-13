- [Todos](#todos)
- [问题](#问题)
    - [如何实现一个router](#如何实现一个router)
    - [各个数据模型之间的关系？](#各个数据模型之间的关系)
    - [如何进行form验证？](#如何进行form验证)
    - [hydration failed initial UI doesn't match what was rendered on the server](#hydration-failed-initial-ui-doesnt-match-what-was-rendered-on-the-server)
    - [利用use-hook-form自定义form表单](#利用use-hook-form自定义form表单)
    - [如何使用zod来限定数据类型为特定枚举类型或自定义判断](#如何使用zod来限定数据类型为特定枚举类型或自定义判断)
    - [禁用input focus的光标框](#禁用input-focus的光标框)
    - [如何使用prisma创建关联对象](#如何使用prisma创建关联对象)
    - [prisma Disambiguating relations](#prisma-disambiguating-relations)
    - [创建一个动态路由](#创建一个动态路由)
    - [Next image图片比例不一致](#next-image图片比例不一致)
    - [如何条件查询在prisma里面](#如何条件查询在prisma里面)
    - [重置数据库](#重置数据库)
    - [路由跳转问题](#路由跳转问题)
    - [next 国际化](#next-国际化)
    - [next router速度太慢了](#next-router速度太慢了)
    - [删除server遇到问题](#删除server遇到问题)
    - [为什么使用useEffect进行事件监听初始化要使用function updater ？](#为什么使用useeffect进行事件监听初始化要使用function-updater-)
    - [如何获取在组件中获取当前动态route的params](#如何获取在组件中获取当前动态route的params)
    - [如何在tailwind中封装一个class，因为每次hover都要反复重复写一次动画，太低效了](#如何在tailwind中封装一个class因为每次hover都要反复重复写一次动画太低效了)
    - [每次打开editModal的时候form数据初始化为选中对象的当前数据](#每次打开editmodal的时候form数据初始化为选中对象的当前数据)
    - [如何在nextjs中使用socket.io](#如何在nextjs中使用socketio)
    - [shadcn-popover溢出到视图外面去了](#shadcn-popover溢出到视图外面去了)
    - [在输入框中按回车同时打开了附件栏](#在输入框中按回车同时打开了附件栏)
    - [next i18n 插值翻译](#next-i18n-插值翻译)
    - [prisma 分页查询 (Cursor-based Pagination)](#prisma-分页查询-cursor-based-pagination)
    - [prisma 如何实现hasNextPage?](#prisma-如何实现hasnextpage)
    - [tanstack-query是啥?](#tanstack-query是啥)
    - [date-fns如何国际化](#date-fns如何国际化)
    - [nextImage 加载不出来](#nextimage-加载不出来)
    - [如何使用react-query配合socket更新已请求的缓存数据](#如何使用react-query配合socket更新已请求的缓存数据)
    - [如何使用ref，并且将在type里面定义ref属性](#如何使用ref并且将在type里面定义ref属性)
    - [如何在ts里写一个throttle](#如何在ts里写一个throttle)
    - [nextjs  url query参数](#nextjs--url-query参数)
    - [部署问题](#部署问题)

**目标**:实现一个discord-clone，同时学习Next.js React Tailwind

**部署地址**：https://maziyo-discord.duckdns.org

**测试账号**：test1@qq.com  abc123456



**参考视频**:https://www.youtube.com/watch?v=ZbX4Ok9YX94&t=39862s

## Todos
- [x] 初始化next项目,安装依赖tailwind，ts，shadcn-ui
    - [x] 初始化shadcn-ui配置项
- [x] 三方登录验证功能 (使用clerk)
- [x] dark mode (使用shadcn-ui内置组件)
- [x] 国际化
- [x] 创建数据库schema (使用prisma，planetScale作为云存储)
    - [x] 需要构建用户，服务器,频道，频道成员
    - [x] 消息存储
- [x] 实现第三方登录后创建用户数据/读取用户数据
    - [x] 验证登录成功后通过clerk提供的currentUser获取用户信息
    - [x] 用户信息查询/创建
- [x] 服务器初始化
    - [x] 静态UI界面
    - [x] 表单验证
    - [x] 图片上传(使用uploadThings)
    - [x] 创建服务器api
- [x] 服务器页面
  - [x] serverId动态路由页面
    - [x] 读取serverId找到该server，并且默认路由跳转到general频道
  - [x] 用户侧边栏
      - [x] layout左右布局配置
      - [x] 添加按钮样式
        - [x] 使用提示框来装饰按钮
      - [x] 服务器图标展示
      - [x] dark mode 以及用户管理按钮
      - [x] 服务器创建模态框
        - [x] 封装模态框(利用zustand作为状态管理器)
        - [x] 封装provider组件提供所有模态框
  - [x] 服务器侧边栏
    - [x] 侧边栏header(展示服务器名称，并且根据权限提供operations)
      - [x] 邀请成员，服务器设置，管理成员，创建频道下拉框展示
      - [x] 邀请功能
        - [x] 邀请链接展示
        - [x] 复制链接
        - [x] 重新生成
        - [x] 邀请码生成页面
      - [x] server编辑功能
        - [x] 提供modal
        - [x] 添加api
      - [x] 成员管理
        - [x] 以模态框的形式展示
        - [x] 展示成员人数
        - [x] 按列表展示成员头像,名称，邮箱，身份等信息
        - [x] 提供编辑功能,权限设置，删除成员
        - [x] 当编辑某个成员时，提供Loading动画
        - [x] 提供api接口进行修改成员数据(虽然不会在页面上显示删除自己，但是可能通过api的方式删除本人，所以要写判断)
      - [x] 提供频道创建功能
        - [x] 以模态框的形式展示
        - [x] 可以自定义频道名称(频道名称不能为general)和类型(audio，video，text)
        - [x] 提供api接口创建频道
      - [x] 提供退出server&解散server功能
        - [x] 以模态框的形式展示
        - [x] 提供api接口退出server或者解散server
    - [x] 搜索框
      - [x] 以模态框形式展示，并且能够通过快捷键按出(可以直接使用shadcn提供的command组件)
      - [x] 按照分组形式展示频道类别和成员(在点击频道和成员时进行路由跳转)
    - [x] 频道&成员展示列表
      - [x] 分区栏()
        - [x] 显示分区名称,例如TEXT，AUDIO，Member
        - [x] 根据权限以及分区类型来提供编辑按钮，频道为添加按钮，成员为管理按钮(触发已有的modal)
      - [x] 频道列表展示
        - [x] 展示频道名称，根据频道种类显示不同icon
        - [x] 根据权限提供 编辑按钮&删除按钮
          - [x] 提供删除modal&API
          - [x] 提供编辑modal&API
        - [x] 高亮当前频道
        - [x] 频道页面跳转，注意edit和delete的事件冒泡
      - [x] 成员列表展示
        - [x] 展示成员名称，根据权限显示不同icon
        - [x] 根据权限提供 删除按钮
        - [x] 高亮当前用户
        - [x] 聊天跳转
- [x] 频道页面
  - [x] 频道header
    - [x] 展示频道名称，icon，展示socket服务器连接状态
    - [x] 配置socket服务器在next后端(socket.io),并且提供context在client端
    - [x] 展示socket服务器连接状态(使用shadcn-badge)
    - [x] 在移动端情况下提供操作按钮,点击可以以drawer/sheet的形式展示侧边栏进行操作
  - [x] 聊天消息展示
    - [x] 欢迎框(当没有消息的时候展示)
    - [x] 根据传入的apiUrl，queryParams参数(conversationId|channelId)来请求对应的消息api,获取消息
      - [x] 提供api获取channelMessages
      - [x] 使用@tanstack/react-query提供的来useInfiniteQuery在聊天框初始化消息,并且使用useSocket来判断是否连接了socket服务器，连接了就配置infiniteQuery不重连，没连接就配置infiniteQuery反复请求获取数据
    - [x] messageItem(渲染消息内容)
      - [x] 展示发送者头像以及身份(点击后能跳转进行对话)
      - [x] 展示发送时间(使用date-fns格式化)
      - [x] 能够展示附件并打开附件
      - [x] 能够编辑消息内容,但文件除外(发送者为自己时才可修改)
        - [x] 当点击edit图标时，文本变成输入框可以进行修改
        - [x] 按回车可以保存，esc可以取消
        - [x] 提供修改消息的api,并且成功后使用socket广播通知
      - [x] 提供删除功能(管理员和发送者都可以删除)
        - [x] 提供删除图标
        - [x] 点击后，以对话框的形式确认是否删除
        - [x] 提供删除api，并且成功后使用socket广播通知
        - [x] 删除后的消息显示该消息已被删除
    - [x] socket监听更新消息(监听两种情况,新建，更新)
      - [x] message新建，通过socket发送add事件，让queryClient在缓存page上新加item
      - [x] message更新的时候，通过socket发送update事件，让queryClient更新之前的请求缓存
    - [x] 滚动加载
      - [x] 当滚动到元素顶部的时候，进行判断加载上一页的数据(根据react-query提供的isFetching和hasNextpage来判断)
      - [x] 当无法滚动时，提供手动加载先前消息的按钮(因为有可能新加载的page内容不够撑开viewport)
  - [x] 聊天发送框
    - [x] 静态UI(提供附件选项，输入框，表情按钮)
    - [x] 提供消息发送api,在请求完api后socket服务器通知更新当前频道的人。
    - [x] 实现添加附件
      - [x] 以modal框形式展示,并且提供上传的apiUrl以及query,最终将生成的附件url以类似message的形式发送至api
      - [x] 上传成功后显示附件内容,并且可以取消附件
    - [x] 表情栏实现(利用popover，emoji-mart)
    - [x] 发送完后重新focus到input上
- [x] 对话页面
  - [x] conversation setup(在数据库中寻找对话|新建对话)
  - [x] 聊天header展示用户名称和头像(将之前频道页面的header复用)
  - [x] 消息列表展示(组件复用channel的)
    - [x] 提供api请求
  - [x] 消息input
    - [x] 提供api请求(组件复用channel的)
- [x] 视频功能(使用livekit)
  - [x] 频道能够多人视频
  - [x] 对话一对一视频
    - [x] 在聊天顶部右侧提供视频按钮(通过router切换url来检测videoMode，因为page无法同时使用useEffect和db,无法父传子)
## 问题

#### 如何实现一个router
在next中通过构建folder，每个folder的根文件为page.tsx，之后在url上输入文件夹名称即可

在next中使用()关键词命名文件夹可以使得文件夹更有结构性，同时不会有router效果
```
| (test)
  | login
    | page.tsx   //最终在url中localhost:xxxx/login即可
效果等同于
| login
    | page.tsx
```
#### 各个数据模型之间的关系？
```
用户(Profile):server[] chanel[] member[]
服务器(server):profileId chanel[] member[]
频道(Chanel): serverId profileId channel_message[]
成员(member): serverId profileId channel_message[] direct_message[]  conversation[](作为发起方) conversations[](作为接收方)
//消息的删除不是真的删除，只是不显示
频道消息(channel_message):memberId channelId
直接消息(direct_message):memberId conversationId
对话(Conversation): conversationInitiatedId conversationReceivedId  direct_message[]
```

#### 如何进行form验证？
使用zod可以进行数据的验证
```js
import {z,ZodError} from 'zod';

//通过链式的方法来定义数据结构和验证规则
const userSchema = z.object({
    id:z.string(),
    username:z.string().min(3),
    email:z.string().email()
});
const userData = {
    id:'123',
    username:'jhon_doe',
    email:'2321@qq.com'
}

try{
    userSchema.parse(userDataA);
    console.log("valid!")
}catch(error){
    console.error('error!!!')
}
```
#### hydration failed initial UI doesn't match what was rendered on the server
```js
解决方案:等元素绑定之后再返回渲染的元素
const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);
```
#### 利用use-hook-form自定义form表单
```js
//https://react-hook-form.com/docs/usecontroller/controller
//https://ui.shadcn.com/docs/components/form
// controller提供了
  <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        control={control}
        name="ReactDatepicker"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactDatePicker
        //   提供了onChange，onBlur，value，ref来修改form的值
            onChange={onChange} // send value to hook form
            onBlur={onBlur} // notify when input is touched/blur
            selected={value}
          />
        )}
      />

      <input type="submit" />
    </form>
```

#### 如何使用zod来限定数据类型为特定枚举类型或自定义判断
```js
// 使用refine可以自定义
const myString = z.string().refine((val) => val.length <= 255, {
  message: "String can't be more than 255 characters",
});
// 使用nativeEnum可以检测枚举类型
enum Fruits {
  Apple = "apple",
  Banana = "banana",
  Cantaloupe, // you can mix numerical and string enums
}

const FruitEnum = z.nativeEnum(Fruits);
type FruitEnum = z.infer<typeof FruitEnum>; // Fruits

FruitEnum.parse(Fruits.Apple); // passes
FruitEnum.parse(Fruits.Cantaloupe); // passes
FruitEnum.parse("apple"); // passes
FruitEnum.parse("banana"); // passes
FruitEnum.parse(0); // passes
FruitEnum.parse("Cantaloupe"); // fails
```

#### 禁用input focus的光标框
```
https://github.com/shadcn-ui/ui/issues/769
https://romansorin.com/blog/disabling-the-tailwind-input-ring
className="focus:ring-0 focus:ring-offset-0 outline-none"
className="focus:ring-transparent"
本来想尝试custom class，但是发现始终失效，于是就直接在input组件内部添加上述两种都行
```

#### 如何使用prisma创建关联对象
```js
使用create关键字：https://www.prisma.io/docs/concepts/components/prisma-schema/relations#create-a-record-and-nested-records
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  posts Post[]
}

model Post {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  author   User   @relation(fields: [authorId], references: [id])
  authorId String @db.ObjectId // relation scalar field  (used in the `@relation` attribute above)
}
const userAndPosts = await prisma.user.create({
  data: {
    posts: {
      create: [
        { title: 'Prisma Day 2020' }, // Populates authorId with user's id
        { title: 'How to write a Prisma schema' }, // Populates authorId with user's id
      ],
    },
  },
})
```

#### prisma Disambiguating relations
```js
在Prisma中，@relation属性的name参数用于区分同一模型之间的多个关系。当你在同一对模型之间定义两个关系时，你需要添加name参数来消除歧义。
例如，考虑以下模型：
model User { 
  id Int @id @default(autoincrement()) 
  name String? 
  writtenPosts Post[] 
  pinnedPost Post?
}

model Post { 
  id Int @id @default(autoincrement()) 
  title String? 
  author User @relation(fields: [authorId], references: [id]) 
  authorId Int 
  pinnedBy User? @relation(fields: [pinnedById], references: [id]) 
  pinnedById Int?
}
在这种情况下，关系是模糊的，有四种不同的方式来解释它们：
User.writtenPosts ↔ Post.author + Post.authorId
User.writtenPosts ↔ Post.pinnedBy + Post.pinnedById
User.pinnedPost ↔ Post.author + Post.authorId
User.pinnedPost ↔ Post.pinnedBy + Post.pinnedById
为了消除这些关系的歧义，你需要使用@relation属性并提供name参数。你可以设置任何name（除了空字符串""），但它必须在关系的两边都是相同的：
model User { 
  id Int @id @default(autoincrement()) 
  name String? 
  writtenPosts Post[] @relation("WrittenPosts") 
  pinnedPost Post? @relation("PinnedPost")
}

model Post { 
  id Int @id @default(autoincrement()) 
  title String? 
  author User @relation("WrittenPosts", fields: [authorId], references: [id]) 
  authorId Int 
  pinnedBy User? @relation("PinnedPost", fields: [pinnedById], references: [id]) 
  pinnedById Int? @unique
}
在这个例子中，我们使用name参数（"WrittenPosts"和"PinnedPost"）来明确指定User和Post之间的两个不同关系。
更多关于@relation属性的信息，你可以参考Prisma的官方文档：https://www.prisma.io/docs/orm/prisma-schema/data-model/relations#disambiguating-relations
```

#### 创建一个动态路由
```js
https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
// app/blog/[slug]/page.tsx 通过[]实现动态路由
```

#### Next image图片比例不一致
```

https://tailwindcss.com/docs/content-configuration#dynamic-class-names
因为我写法有问题,tailwind 不兼容
    <div className={cn(`h-[${height}px] w-[${width}px] overflow-hidden relative`, className)}>
      <NextImage fill src={src} alt={alt}></NextImage>
    </div>
```
#### 如何条件查询在prisma里面
```js
//使用or运算符
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            //方法1
            OR: [{ type: 'ADMIN' }, { type: 'MODERATOR' }]
            // 方法2,用in
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          }
        }
      },
      data: {
        inviteCode: uuidV4()
      }
    })
```
#### 重置数据库
```
npx prisma db push --force-reset
```
#### 路由跳转问题
```
使用redirect不起作用，遇到error，
https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
At the moment, the workaround I found is to not use:

import { redirect } from 'next/navigation';
But to use instead:

import { useRouter } from 'next/navigation'
const router = useRouter()
router.push("/")
```
#### next 国际化
```js
// 1.使用框架
link:https://juejin.cn/post/7300460850011635766?searchId=2023122514051346A97820CD9573BB4D0F
// 搜来搜去发现自己总是在找所谓的"最佳国际化方法",我的目标不是最优解，而是解决问题啊！！！
// 2.middleware 出问题了
links:https://www.youtube.com/watch?v=0i4pVrOaoiQ
// 3.sign-in和sign-up重定向报错
目前来说只能写死zh/sign-in,这样子太不稳妥了，所以我决定直接使用默认的登录配置了
```

#### next router速度太慢了
```js
// sources:https://stackoverflow.com/questions/65146878/nextjs-router-seems-very-slow-compare-to-react-router#:~:text=The%20issue%20arises%20because%20every,operations%20as%20much%20as%20possible.

// The issue arises because every time you use router.push, it triggers getInitialProps for the page from scratch. This can be quite expensive in terms of performance, especially if you're doing heavy calculations in your React code. To mitigate this, you might want to consider expensive operations as much as possible

import { useRouter } from "next/router";
const router = useRouter();
const mypath = `/dashboard/some_path`;
router.push(mypath);
With:

const urlOrPath = `/dashboard/some_path`;
window.location.href= urlOrPath;
```

#### 删除server遇到问题
```js
原因：server与其他数据的外键作了绑定限制
需要在关联函数上添加删除后的动作onDelete将与之有绑定的其他数据也删除
// links:https://github.com/prisma/prisma/discussions/10867
model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId Int
}

model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
```
#### 为什么使用useEffect进行事件监听初始化要使用function updater ？
```js
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // 如果是这样子写的话，无依赖，那么每次执行都会只是取到open的false，因为此时存储的是一个闭包,并且open是一个快照
        setOpen(!open) //(X)
        setOpen((open)=>!open)//这个的话就会放到一个队列中去执行,并且参数是取的上一次的state
      }
    }
    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])
```
#### 如何获取在组件中获取当前动态route的params
```js
// links:https://nextjs.org/docs/app/api-reference/functions/use-params
```

#### 如何在tailwind中封装一个class，因为每次hover都要反复重复写一次动画，太低效了
```
links:https://tailwindcss.com/docs/adding-custom-styles
@layer utilities {
  .hover-animation {
    @apply hover:bg-zinc-700/10  dark:hover:bg-zinc-700/50 transition cursor-pointer;
  }
}
```
#### 每次打开editModal的时候form数据初始化为选中对象的当前数据
```js
// 加个isOpened作为监听对象即可
  const isOpened = isOpen && type === 'editServer'

  useEffect(() => {
    if (server && isOpened) {
      form.setValue('name', server.name)
      form.setValue('image', server.image)
    }
  }, [form, server, isOpened])

```


#### 如何在nextjs中使用socket.io
```js
/*参考links：
https://blog.geogo.in/setting-up-socket-io-with-next-js-13-real-time-communication-in-your-web-application-8c95cf17e0c
https://blog.stackademic.com/building-a-real-time-chat-app-with-next-js-socket-io-and-typescript-e60ba40c09c7
实战例子：https://codesandbox.io/p/devbox/nextjs-socketio-chat-piffv?file=%2Fsrc%2Ftypes%2Fnext.ts%3A5%2C39-5%2C54 (原来还可以去这种地方找)
*/

//1.利用route handler来初始化服务器(目前好像2024年1.21,还不能在app router里面使用server来生成socket，https://github.com/vercel/next.js/discussions/47782,所以采用page和app并用的方法)
/* tips:因为pages不能嵌套locale作为动态路径使用api，所以在检验url的时候，应该设为publicRoute
Any file inside the folder pages/api is mapped to /api/* and will be treated as an API endpoint instead of a page. 
links:https://www.answeroverflow.com/m/1163761902179074088
export default authMiddleware({
  beforeAuth: req => {
    return intlMiddleWare(req)
  },
  publicRoutes: ['/api/uploadthing'],
  ignoredRoutes: ['/api/socket/(.*)']
})


*/ 
import { NextApiResponseServerIO } from '@/type'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  // 初始化socket server
  if (!res.socket.server.io) {
    const httpServer = res.socket.server as any
    console.log('[ Socket Server initializing  ] ')
    const io = new ServerIO(httpServer, {
      path: '/api/socketio'
    })
    res.socket.server.io = io
  }
  res.end()
}
//2.写一个provider将socket-client在客户端全局提供
// 参考links:https://medium.com/@steveleung9527/react-contextapi-socket-io-setup-typescript-174acda1164
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextState {
  socket: Socket | null
  isConnected: boolean
}

export const SocketContext = createContext<SocketContextState>({} as SocketContextState)

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SITE!, {
      path: '/api/socketio'
    })
    socket.on('connect', () => {
      console.log('[SOCKET CONNECTED] >', socket.id)
      setIsConnected(true)
      setSocket(socket)
    })

    if (socket) {
      return () => {
        socket.disconnect()
      }
    }
  }, [])
  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}

export default SocketProvider
```

#### shadcn-popover溢出到视图外面去了
```js
// issues:https://github.com/radix-ui/primitives/issues/557
// avoidCollisions,collisionBoundary,collisionPadding好像是跟这几个属性相关，但我不是很想看。。。
// 目前只能调整一下方向来展示
      <PopoverContent side='left'  className="p-0">
        <Picker data={data} onEmojiSelect={onChange} />
      </PopoverContent>
```

#### 在输入框中按回车同时打开了附件栏
```js
// 因为form中的button在类型没设置的情况下按下回车后会自动触发onSubmit,然后触发按钮的onClick，解决方法就是type设置为button
 <Button
  type="button"
    onClick={() => {
    onOpen('fileAttachment', { apiUrl, query })
  }}
  variant="ghost"
  size="icon"
  className="p-1 w-7 h-7 border-transparent rounded-full text-sm bg-zinc-500 hover:bg-zinc-600 dark:hover:bg-zinc-200 hover:text-white dark:bg-zinc-400 text-white dark:text-[#313338]" >
 ```

 #### next i18n 插值翻译
 ```js
 links:https://www.i18next.com/translation-function/interpolation
{
    "key": "{{what}} is {{how}}"
}
i18next.t('key', { what: 'i18next', how: 'great' });
// -> "i18next is great"
// -> "I am Jan"
 ```

 #### prisma 分页查询 (Cursor-based Pagination)
 ```js
 //links:https://www.prisma.io/docs/orm/prisma-client/queries/pagination#cursor-based-pagination
 const firstQueryResults = await prisma.post.findMany({
  take: 4,
  where: { title: { contains: 'Prisma' } },
  orderBy: { id: 'asc' },
});


// Bookmark your location in the result set - in this case, the ID of the last post in the list of 4.
const lastPostInResults = firstQueryResults[3]; // Remember: zero-based index! :)
const myCursor = lastPostInResults.id; // Example: 29

const secondQueryResults = await prisma.post.findMany({
  take: 4,
  skip: 1, // Skip the cursor
  cursor: { id: myCursor },
  where: { title: { contains: 'Prisma' } },
  orderBy: { id: 'asc' },
});

const lastPostInResults = secondQueryResults[3]; // Remember: zero-based index! :)
const myCursor = lastPostInResults.id; // Example: 52
 ```

#### prisma 如何实现hasNextPage?
```js
// Fetch PAGE_BATCH + 1 messages
messages = await db.channelMessage.findMany({
  take: PAGE_BATCH + 1,
  where: {
    channelId
  },
  include: {
    member: {
      include: {
        Profile: true
      }
    }
  },
  orderBy: {
    createdAt: 'desc'
  }
})

let hasNextPage = false;
let nextCursor = null;

// If we got an extra message, there's a next page
if (messages.length === PAGE_BATCH + 1) {
  hasNextPage = true;
  messages.pop(); // Remove the extra message
}

// If there's a next page, set the nextCursor to the ID of the last message
if (hasNextPage) {
  nextCursor = messages[messages.length - 1].id;
}
// 土方法
```

#### tanstack-query是啥?
```js
// 1.一种封装好的请求工具，将异步请求函数放进去执行，会对该请求添加一个key用于缓存，当再次请求带有相同key的函数时，会直接拿现有的缓存，
// 2.并且调用请求后会返回当前状态等一系列数据信息(实时更新),
// 3.可以实现条件执行，当满足某种条件后再去fetch data
const { status: statusUser, data:user } = useQuery(
enabled:post?.userId!=null,
queryKey:["users",post?.userId],
queryFn:()=>getUser(post!.userId))
// 4.能够进行修改数据的同时，减少请求的次数
const {status,error,mutate}=useMutation(
{ 
    mutationFn：createPost,
    onSuccess：newPost=>{
      // 无需再次请求，直接设置好
    queryclient.setQueryData(["posts",newPost.id],newPost)
    navigate(/posts/s(newPost.id))
}
})
// 5.能够快速进行分页请求以及滚动无限加载
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
//https://tanstack.com/query/latest/docs/framework/react/examples/load-more-infinite-scroll
```

#### date-fns如何国际化
```js
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import { getI18n } from 'react-i18next'

const locales = { zh: zhCN, en: enUS }

export default function dateFormat(date: Date, formatStr = 'PPpp') {
  const { language } = getI18n()
  return format(date, formatStr, {
    locale: locales[language as 'zh' | 'en']
 })
}
//参考格式:https://date-fns.org/v3.3.1/docs/format
```

#### nextImage 加载不出来
```
links:https://cloud.tencent.com/developer/ask/sof/106766303
又好了，我也不知道啥原因，目前无法复现。
```

#### 如何使用react-query配合socket更新已请求的缓存数据
```js
links:https://tkdodo.eu/blog/using-web-sockets-with-react-query

      queryClient.setQueryData([queryKey], (oldData: any) => {
        // 需要返回一个immutable的对象
        const newPages = oldData.pages.slice()
// Immutability , Updates via setQueryData must be performed in an immutable way. DO NOT attempt to write directly to the cache by mutating oldData or data that you retrieved via getQueryData in place.
        newPages[0] = {
          ...newPages[0],
          items: [message, ...newPages[0].items]
        }

        const newData = {
          ...oldData,
          pages: newPages
        }
        return newData
      })
```


#### 如何使用ref，并且将在type里面定义ref属性
```js
links:https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript
  type  stepInput= React.RefObject<HTMLInputElement>;
```

#### 如何在ts里写一个throttle
```js
//links:https://vue3js.cn/interview/JavaScript/debounce_throttle.html#%E4%BB%A3%E7%A0%81%E5%AE%9E%E7%8E%B0
export function throttle(fn: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  let startTime = Date.now()
  return function (...args: any) {
    let curTime = Date.now()
    let remaining = delay - (curTime - startTime)
    // 说明超过delay了
    if (remaining <= 0) {
      fn(...args)
      startTime = Date.now()
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, remaining)
    }
  }
}
```
#### nextjs  url query参数
```js
page links:https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
component links:https://www.codingbeautydev.com/blog/nextjs-get-url-query-params
```

#### 部署问题 
```js
// 阿里云npm i killed 内存不够了，使用虚拟内存
links:https://cloud.tencent.com/developer/article/1750413
// node 内存崩溃
links:https://www.jianshu.com/p/a0a0b57a375c
// https 才能访问camera
参考视频:https://www.youtube.com/watch?v=qlcVx-k-02E   https://notthebe.ee/blog/easy-ssl-in-homelab-dns01/
```