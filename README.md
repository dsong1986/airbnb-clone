This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.ts`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Getting Start
### create a new projext
```bash
npx create-next-app@latest --typescript 
```
for default choice, please rember to choose to use [App]

### clean everything
go to `page.tsx` delete `main` block, put `<></>` instead.
go to `globals.css` delete everything except the 
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### add goolge font Nunito
in layout.tsx file

### tailwindcss install
it is installed when we created the project, skip it

## Coding
### navbar

### prisma
npm install prisma 
npx prisma init
npm install @prisma/client
run `npx prisma db push `to create the unique constraint and index on the database?





https://www.youtube.com/watch?v=EFucgPdjeNg


query string
https://www.npmjs.com/package/query-string


countries
https://www.npmjs.com/package/world-countries


react select
https://react-select.com/home



leaflet for reactive map
https://leafletjs.com/download.html

npm i leaflet
npm i -D @types/leaflet 
npm i react-leaflet