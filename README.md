# DevTer 🐦
**Web application to create your posts and share them with the tech community!.**

![Demo](https://res.cloudinary.com/dnxchppfm/image/upload/v1658072985/devter/devter_ea8yza.gif)

&nbsp;

## Features ⚙️
---
1. Log in with GitHub.
2. List posts.
3. Create posts.
4. Add an image to the post.
5. Delete only own posts.
6. Like posts.
7. Copy URL of the post to share it.
8. Responsive design

&nbsp;

## Main Technologies 🧪
---

- **Next JS**
- **TypeScript** 
- **Firebase** (Auth - Database - Storage - Admin)
- **Zustand** (State management)
- **DaisyUI** (component library)
- **Vercel** (to deploy the app)

&nbsp;


## **Installation 🧰**
---

1. Clone the repository (you need to have [Git](https://git-scm.com) installed).

```shell
    git clone https://github.com/Franklin361/devter.git
```

2.  Install dependencies of the project.

```shell
    npm install
```

3. Before running the development server, you need to...
    - Create a project in firebase and get credentials.
    - Create an `.env` file in the root of the project and set the following value and add the connection string from your mongo database 
    ```
    NEXT_PUBLIC_APIKEY=
    NEXT_PUBLIC_AUTHDOMAI=N=
    NEXT_PUBLIC_PROJECTID=
    NEXT_PUBLIC_STORAGEBUCKET=
    NEXT_PUBLIC_MESSA=GINGSENDERID=
    NEXT_PUBLIC_APPID=
    NEXT_PUBLIC_APP_DATABASEURL=

    FIREBASE_ACCOUNT_KEY_PRIVATE_KEY=
    FIREBASE_ACCOUNT_KEY_CLIENT_EMAIL=
    FIREBASE_ACCOUNT_KEY_PROJECT_ID=
    ```

4. Run the project.
```shell
    npm run dev
```
&nbsp;

## **Demo ⛓️**
---
[https://devter.vercel.app](https://devter.vercel.app/)

