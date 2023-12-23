import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// export const prisma = await (async () => {
//   const prisma = new PrismaClient()
//   if (await prisma.server.count() === 0) {
//     await prisma.server.createMany({
//       data: [
//         {
//           id: 1,
//           name: "New York"
//         },
//         {
//           id: 2,
//           name: "Detroit"
//         },
//         {
//           id: 3,
//           name: "Chicago"
//         },
//         {
//           id: 4,
//           name: "San Francisco"
//         },
//         {
//           id: 5,
//           name: "Atlanta"
//         },
//         {
//           id: 6,
//           name: "San Diego"
//         },
//         {
//           id: 7,
//           name: "Los Angeles"
//         },
//         {
//           id: 8,
//           name: "Miami"
//         },
//         {
//           id: 9,
//           name: "Las Vegas"
//         }
//       ]
//     })

//     const data = []

//     for (let i=0; i<1000; i++) {
//       const betId = i+1
//       let result: $Enums.Color = "WHITE"
//       switch (Math.floor(Math.random()*4)) {
//         case 0: {
//           result = "WHITE"
//           break
//         }
//         case 1: {
//           result = "RED"
//           break
//         }
//         case 2: {
//           result = "GREEN"
//           break
//         }
//         case 3: {
//           result = "GOLD"
//           break
//         }
//       }

//       data.push({
//         betId,
//         result,
//         serverId: 9
//       })
//     }

//     await prisma.bet.createMany({
//       data 
//     })
//   }
//   return prisma
// })()
