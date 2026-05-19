import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MatchService {
  async checkAndCreateMatch(userAId: string, userBId: string) {
    // normalize order (VERY IMPORTANT)
    const [userOneId, userTwoId] = [userAId, userBId].sort();

    // check if match exists
    const existing = await prisma.match.findUnique({
      where: {
        userOneId_userTwoId: {
          userOneId,
          userTwoId,
        },
      },
    });

    if (existing) return existing;

    // check mutual RIGHT swipes
    const [aSwiped, bSwiped] = await Promise.all([
      prisma.swipe.findFirst({
        where: {
          senderId: userAId,
          receiverId: userBId,
          type: "RIGHT",
        },
      }),
      prisma.swipe.findFirst({
        where: {
          senderId: userBId,
          receiverId: userAId,
          type: "RIGHT",
        },
      }),
    ]);

    if (!aSwiped || !bSwiped) return null;

    // create match
    return prisma.match.create({
      data: {
        userOneId,
        userTwoId,
      },
    });
  }
}