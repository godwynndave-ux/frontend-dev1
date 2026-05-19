/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client';
import { RealtimeGateway } from '../realtime/realtime.gateway';

const prisma = new PrismaClient();

export class MatchService {
  static createMatch: any;
  constructor(private realtime: RealtimeGateway) {}

  async checkAndCreateMatch(userAId: string, userBId: string) {
    // normalize order (VERY IMPORTANT)
    const [userOneId, userTwoId] = [userAId, userBId].sort();

    // check if match already exists
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
          type: 'RIGHT',
        },
      }),

      prisma.swipe.findFirst({
        where: {
          senderId: userBId,
          receiverId: userAId,
          type: 'RIGHT',
        },
      }),
    ]);

    // no mutual swipe
    if (aSwiped && bSwiped) {
      const match = await MatchService.createMatch(userAId, userBId);

      this.realtime.emitToUser(userAId, 'match', match);
      this.realtime.emitToUser(userBId, 'match', match);
    }
    // create match
    const match = await prisma.match.create({
      data: {
        userOneId,
        userTwoId,
      },
    });
    // 🔥 REAL-TIME EVENT
    this.realtime.emitToUser(userOneId, 'match', {
      matchId: match.id,
      userId: userTwoId,
    });

    this.realtime.emitToUser(userTwoId, 'match', {
      matchId: match.id,
      userId: userOneId,
    });
    // 🔥 AUTO CREATE CONVERSATION
    await prisma.conversation.create({
      data: {
        matchId: match.id,
      },
    });

    // 🔥 REAL-TIME EVENTS
    this.realtime.emitToUser(userAId, 'match', {
      matchId: match.id,
      matchedUserId: userBId,
    });

    this.realtime.emitToUser(userBId, 'match', {
      matchId: match.id,
      matchedUserId: userAId,
    });

    console.log('🔥 MATCH CREATED:', match.id);

    return match;
  }
}
